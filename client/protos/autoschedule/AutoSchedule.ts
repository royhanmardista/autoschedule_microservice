// Original file: protos/autoschedule.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GenerateScheduleInput as _autoschedule_GenerateScheduleInput, GenerateScheduleInput__Output as _autoschedule_GenerateScheduleInput__Output } from '../autoschedule/GenerateScheduleInput';
import type { GenerateScheduleOutput as _autoschedule_GenerateScheduleOutput, GenerateScheduleOutput__Output as _autoschedule_GenerateScheduleOutput__Output } from '../autoschedule/GenerateScheduleOutput';

export interface AutoScheduleClient extends grpc.Client {
  GenerateSchedule(argument: _autoschedule_GenerateScheduleInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _autoschedule_GenerateScheduleOutput__Output) => void): grpc.ClientUnaryCall;
  GenerateSchedule(argument: _autoschedule_GenerateScheduleInput, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _autoschedule_GenerateScheduleOutput__Output) => void): grpc.ClientUnaryCall;
  GenerateSchedule(argument: _autoschedule_GenerateScheduleInput, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _autoschedule_GenerateScheduleOutput__Output) => void): grpc.ClientUnaryCall;
  GenerateSchedule(argument: _autoschedule_GenerateScheduleInput, callback: (error?: grpc.ServiceError, result?: _autoschedule_GenerateScheduleOutput__Output) => void): grpc.ClientUnaryCall;
  generateSchedule(argument: _autoschedule_GenerateScheduleInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _autoschedule_GenerateScheduleOutput__Output) => void): grpc.ClientUnaryCall;
  generateSchedule(argument: _autoschedule_GenerateScheduleInput, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _autoschedule_GenerateScheduleOutput__Output) => void): grpc.ClientUnaryCall;
  generateSchedule(argument: _autoschedule_GenerateScheduleInput, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _autoschedule_GenerateScheduleOutput__Output) => void): grpc.ClientUnaryCall;
  generateSchedule(argument: _autoschedule_GenerateScheduleInput, callback: (error?: grpc.ServiceError, result?: _autoschedule_GenerateScheduleOutput__Output) => void): grpc.ClientUnaryCall;
  
}

export interface AutoScheduleHandlers extends grpc.UntypedServiceImplementation {
  GenerateSchedule: grpc.handleUnaryCall<_autoschedule_GenerateScheduleInput__Output, _autoschedule_GenerateScheduleOutput>;
  
}

export interface AutoScheduleDefinition extends grpc.ServiceDefinition {
  GenerateSchedule: MethodDefinition<_autoschedule_GenerateScheduleInput, _autoschedule_GenerateScheduleOutput, _autoschedule_GenerateScheduleInput__Output, _autoschedule_GenerateScheduleOutput__Output>
}
