import logging
from concurrent import futures
from google.protobuf import json_format

import grpc

import autoschedule_pb2 as autoscheduleMessage
import autoschedule_pb2_grpc as autoscheduleService
from model import generateSchedule

def convert_schedule_to_buff(schedules):
  for key, value in schedules.items():
      schedules[key] = autoscheduleMessage.Schedule(schedule = value)
  return schedules

def convert_days_to_list(days):
  for key, value in days.items():
      days[key] = list(range(value['start'], value['end']))
  return days

class AutoSchedule(autoscheduleService.AutoScheduleServicer):
    def GenerateSchedule(self, request, context):
        generateScheduleInput = json_format.MessageToDict(request)
        days = convert_days_to_list(generateScheduleInput['days'])
        shiftSlots = generateScheduleInput['shiftSlots']
        staffDicts = generateScheduleInput['staffDicts']
        schedules = generateSchedule(days, shiftSlots, staffDicts)
        return autoscheduleMessage.GenerateScheduleOutput(schedules = convert_schedule_to_buff(schedules))
