import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AutoScheduleClient as _autoschedule_AutoScheduleClient, AutoScheduleDefinition as _autoschedule_AutoScheduleDefinition } from './autoschedule/AutoSchedule';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  autoschedule: {
    AutoSchedule: SubtypeConstructor<typeof grpc.Client, _autoschedule_AutoScheduleClient> & { service: _autoschedule_AutoScheduleDefinition }
    Day: MessageTypeDefinition
    GenerateScheduleInput: MessageTypeDefinition
    GenerateScheduleOutput: MessageTypeDefinition
    Schedule: MessageTypeDefinition
    ShiftSlot: MessageTypeDefinition
    StaffDict: MessageTypeDefinition
  }
}

