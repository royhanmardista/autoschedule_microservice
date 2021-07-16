// Original file: protos/autoschedule.proto


export interface ShiftSlot {
  'shiftSlotId'?: (number);
  'start'?: (number);
  'end'?: (number);
  'hours'?: (number);
  '_shiftSlotId'?: "shiftSlotId";
  '_start'?: "start";
  '_end'?: "end";
}

export interface ShiftSlot__Output {
  'shiftSlotId'?: (number);
  'start'?: (number);
  'end'?: (number);
  'hours': (number);
  '_shiftSlotId': "shiftSlotId";
  '_start': "start";
  '_end': "end";
}
