from ortools.sat.python import cp_model

def generateSchedule(days, shiftSlots, staff_dict):

    # print(days)
    # print(staff_dict)

    shifts_data = []
    for staff in range(len(staff_dict)):
        shifts_data.append([])
        for day in range(len(days)):
            shifts_data[staff].append([])
            for shift in range(len(shiftSlots)):
                if (shift in days[day]):
                    shifts_data[staff][day].append(
                        [
                            1,
                            shiftSlots[shift]['hours'],
                            (shiftSlots[shift]['start'], shiftSlots[shift]['end']),
                        ])
                else:
                    shifts_data[staff][day].append(
                        [0, 0, (0, 0)])
    # This program tries to find an optimal assignment of all_staff to shifts
    all_staff = range(len(staff_dict))
    all_shifts = range(len(shiftSlots))
    all_days = range(len(days))

    model = cp_model.CpModel()

    # Creates shift variables.
    # shifts[(n, d, s)]: staff 'n' works shift 's' on day 'd' on hour 'h'
    shifts = {}
    for n in all_staff:
        for d in all_days:
            for s in all_shifts:
                shifts[n, d, s] = model.NewBoolVar(
                    'shift_n%id%is%i' % (n, d, s))

    # =======================================================================================
    #
    # Constraint 1:
    # - Each shiftslot is assigned to at most one staff.
    # [START at_most_one_staff]
    for d in all_days:
        for s in all_shifts:
            # Constraint 1
            model.Add(sum(shifts[(n, d, s)] for n in all_staff) <= 1)
    # [END at_most_one_staff]
    #
    # =======================================================================================
    #
    # Constraint 2:
    # - Each staff works at most n hour per week according to weekly OT limit.
    # [START at_most_n_weekly_hours]
    for n in all_staff:
        # Constraint 2
        model.Add(sum(shifts[(n, d, s)] * shifts_data[n][d][s][1]
                  for d in all_days for s in all_shifts) <= staff_dict[n]['weeklyOtLimit'])
    # [END at_most_n_weekly_hours]
    #
    # =======================================================================================
    #
    # Constraint 3:
    # - Each staff works at most m hour per day according to daily OT limit.
    # [START at_most_m_daily_hours]
    for n in all_staff:
        for d in all_days:
            # Constraint 3
            model.Add(sum(shifts[(n, d, s)] * shifts_data[n][d][s][1]
                          for s in all_shifts) <= staff_dict[n]['dailyOtLimit'])
    # [END at_most_m_daily_hours]
    #
    # =======================================================================================
    #
    # Constraint 4:
    # - There should not be any clashing shiftSlot within a day
    # [START no_clashing_shiftSlots_within_a_day]
    for n in all_staff:
        for d in all_days:
            for s in days[d]:
                for s1 in days[d]:
                    if (s == s1):
                        continue
                    clash = not (shiftSlots[s]['end'] <= shiftSlots[s1][
                        'start'] or shiftSlots[s]['start'] >= shiftSlots[s1]['end'])
                    # Constraint 4
                    model.Add(
                        (shifts[n, d, s] + shifts[n, d, s1]) * clash != 2)
    # [END no_clashing_shiftSlots_within_a_day]
    #
    # ======================================================================================
    #
    # Constraint 5:
    # - There should not be any clashing shiftSlot across 2 consecutive day
    # Constraint 6:
    # - There should be atleast a 7 hours gap between end of shift for previous day and start of shift for next day
    # [START no_clashing_shiftSlots_across_day AND enforce_7_hours_gap_for_shiftSlots_across_day]
    for n in all_staff:
        for d in all_days:
            for s in days[d]:
                for s1 in days[(d+1) % 7]:
                    overnight_shiftSlot = shiftSlots[s]['end'] < shiftSlots[s]['start']

                    if (overnight_shiftSlot):
                        clashing_across_day = shiftSlots[s]['end'] > shiftSlots[s1]['start']
                        # Constraint 5
                        model.Add(
                            (shifts[n, d, s] + shifts[n, (d+1) % 7, s1]) * clashing_across_day != 2)

                        less_than_7_hours_gap = (
                            shiftSlots[s1]['start'] - shiftSlots[s]['end']) < 7

                        # Constraint 6
                        model.Add(
                            (shifts[n, d, s] + shifts[n, (d+1) % 7, s1]) *
                            less_than_7_hours_gap != 2
                        )
    # [END no_clashing_shiftSlots_across_day AND enforce_7_hours_gap_for_shiftSlots_across_day]
    #
    # ======================================================================================
    #
    # Constraint 7:
    # - User should not be assigned shiftSlots for 5 consecutive days
    # [START no_5_consecutive_days]
    for n in all_staff:
        for d in all_days:
            # Constraint 7
            model.Add(sum(shifts[n, (d + d1) % 7, s]
                      for d1 in range(5) for s in all_shifts) < 5)
    # [END no_5_consecutive_days]
    #
    # ======================================================================================

    # Objective 1: Maximize assignment of shiftSlot to user with higher score
    # By maximizing the score of user, the algorithm will prioritize assignment to user
    # with the highest score
    model.Maximize(
        sum(
            shifts[n, d, s] * shifts_data[n][d][s][0] * staff_dict[n]['score']
            # adding 100 to full-timer to give precedence for full-timer over part-timer
            # (staff_dict[n]['score'] + (100 if staff_dict[n]
            #  ['fulltime'] == 1 else 0))
            for n in all_staff
            for d in all_days
            for s in all_shifts
        )
    )

    # Creates the solver and solve.
    solver = cp_model.CpSolver()
    solver.parameters.max_time_in_seconds = 5
    status = solver.Solve(model)

    if (status == cp_model.INFEASIBLE):
        print("\nNot feasible\n")
        print(solver.ResponseStats())
        return print()

    output = {}
    for n in all_staff:
        output[str(n)] = []

    for d in all_days:
        for n in all_staff:
            for s in all_shifts:
                if solver.Value(shifts[n, d, s]) == 1:
                    if shifts_data[n][d][s][0] == 1:
                        output[str(n)].append(str(s))

    return output


# generateSchedule(days, shiftSlots, staff_dict )