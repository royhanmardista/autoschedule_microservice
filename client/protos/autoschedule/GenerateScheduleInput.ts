// Original file: protos/autoschedule.proto

import type { Day as _autoschedule_Day, Day__Output as _autoschedule_Day__Output } from '../autoschedule/Day';
import type { ShiftSlot as _autoschedule_ShiftSlot, ShiftSlot__Output as _autoschedule_ShiftSlot__Output } from '../autoschedule/ShiftSlot';
import type { StaffDict as _autoschedule_StaffDict, StaffDict__Output as _autoschedule_StaffDict__Output } from '../autoschedule/StaffDict';

export interface GenerateScheduleInput {
  'days'?: ({[key: number]: _autoschedule_Day});
  'shiftSlots'?: ({[key: number]: _autoschedule_ShiftSlot});
  'staffDicts'?: ({[key: number]: _autoschedule_StaffDict});
}

export interface GenerateScheduleInput__Output {
  'days': ({[key: number]: _autoschedule_Day__Output});
  'shiftSlots': ({[key: number]: _autoschedule_ShiftSlot__Output});
  'staffDicts': ({[key: number]: _autoschedule_StaffDict__Output});
}
