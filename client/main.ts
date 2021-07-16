import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from './protos/autoschedule'
import { GenerateScheduleInput } from './protos/autoschedule/GenerateScheduleInput'

const PROTO_PATH = __dirname + '/protos/autoschedule.proto'

interface StaffsSchedules {
  [key: string]: string[]
}

const days = {
  0: { "start": 0, "end": 2 },
  1: { "start": 2, "end": 4 },
  2: { "start": 4, "end": 7 },
  3: { "start": 7, "end": 8 },
  4: { "start": 8, "end": 10 },
  5: { "start": 10, "end": 16 },
  6: { "start": 16, "end": 21 },
}

const shiftSlots = {
  0: { 'shiftSlotId': 0, 'start': 12, 'end': 20, 'hours': 8 },
  1: { 'shiftSlotId': 1, 'start': 8, 'end': 16, 'hours': 8 },
  2: { 'shiftSlotId': 2, 'start': 3, 'end': 5, 'hours': 2 },
  3: { 'shiftSlotId': 3, 'start': 0, 'end': 8, 'hours': 8 },
  4: { 'shiftSlotId': 4, 'start': 8, 'end': 15, 'hours': 7 },
  5: { 'shiftSlotId': 5, 'start': 5, 'end': 10, 'hours': 5 },
  6: { 'shiftSlotId': 6, 'start': 8, 'end': 14, 'hours': 6 },
  7: { 'shiftSlotId': 7, 'start': 8, 'end': 16, 'hours': 8 },
  8: { 'shiftSlotId': 8, 'start': 8, 'end': 16, 'hours': 8 },
  9: { 'shiftSlotId': 9, 'start': 2, 'end': 22, 'hours': 20 },
  10: { 'shiftSlotId': 10, 'start': 10, 'end': 18, 'hours': 8 },
  11: { 'shiftSlotId': 11, 'start': 12, 'end': 20, 'hours': 8 },
  12: { 'shiftSlotId': 12, 'start': 14, 'end': 22, 'hours': 8 },
  13: { 'shiftSlotId': 13, 'start': 16, 'end': 24, 'hours': 8 },
  14: { 'shiftSlotId': 14, 'start': 10, 'end': 18, 'hours': 8 },
  // overlapping shiftSlots across day
  15: { 'shiftSlotId': 15, 'start': 19, 'end': 5, 'hours': 10 },
  16: { 'shiftSlotId': 16, 'start': 13, 'end': 23, 'hours': 10 },
  17: { 'shiftSlotId': 17, 'start': 11, 'end': 21, 'hours': 10 },
  18: { 'shiftSlotId': 18, 'start': 13, 'end': 16, 'hours': 3 },
  19: { 'shiftSlotId': 19, 'start': 2, 'end': 3, 'hours': 1 },
  20: { 'shiftSlotId': 20, 'start': 1, 'end': 5, 'hours': 4 },
}

const staffDicts = {
  0: { 'userId': 'marcus', 'dailyOtLimit': 8, 'weeklyOtLimit': 46, 'score': 1, 'fulltime': 1 },
  1: { 'userId': 'cherry', 'dailyOtLimit': 8, 'weeklyOtLimit': 44, 'score': 2, 'fulltime': 1 },
  2: { 'userId': 'daniel', 'dailyOtLimit': 8, 'weeklyOtLimit': 46, 'score': 3, 'fulltime': 1 },
  3: { 'userId': 'elijah', 'dailyOtLimit': 10, 'weeklyOtLimit': 46, 'score': 4, 'fulltime': 1 },
  4: { 'userId': 'phillip', 'dailyOtLimit': 8, 'weeklyOtLimit': 44, 'score': 5, 'fulltime': 1 },
  5: { 'userId': 'marcel', 'dailyOtLimit': 8, 'weeklyOtLimit': 46, 'score': 6, 'fulltime': 1 },
  6: { 'userId': 'winston', 'dailyOtLimit': 10, 'weeklyOtLimit': 46, 'score': 7, 'fulltime': 1 },
  7: { 'userId': 'arial', 'dailyOtLimit': 8, 'weeklyOtLimit': 44, 'score': 8, 'fulltime': 1 },
  8: { 'userId': 'tina', 'dailyOtLimit': 10, 'weeklyOtLimit': 46, 'score': 9, 'fulltime': 1 },
  9: { 'userId': 'marcus_1', 'dailyOtLimit': 8, 'weeklyOtLimit': 46, 'score': 10, 'fulltime': 0 },
  10: { 'userId': 'cherry_1', 'dailyOtLimit': 8, 'weeklyOtLimit': 44, 'score': 11, 'fulltime': 0 },
  11: { 'userId': 'daniel_1', 'dailyOtLimit': 10, 'weeklyOtLimit': 46, 'score': 12, 'fulltime': 0 },
  12: { 'userId': 'elijah_1', 'dailyOtLimit': 8, 'weeklyOtLimit': 46, 'score': 13, 'fulltime': 0 },
  13: { 'userId': 'phillip_1', 'dailyOtLimit': 8, 'weeklyOtLimit': 44, 'score': 14, 'fulltime': 0 },
  14: { 'userId': 'marcel_1', 'dailyOtLimit': 8, 'weeklyOtLimit': 46, 'score': 15, 'fulltime': 0 },
  15: { 'userId': 'winston_1', 'dailyOtLimit': 10, 'weeklyOtLimit': 46, 'score': 16, 'fulltime': 0 },
  16: { 'userId': 'arial_1', 'dailyOtLimit': 8, 'weeklyOtLimit': 44, 'score': 17, 'fulltime': 0 },
  17: { 'userId': 'tina_1', 'dailyOtLimit': 10, 'weeklyOtLimit': 46, 'score': 18, 'fulltime': 0 },
}

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });

const protoObj = (grpc.loadPackageDefinition(packageDefinition)) as unknown as ProtoGrpcType
const autoschedule = protoObj.autoschedule
const client = new autoschedule.AutoSchedule('localhost:50051', grpc.credentials.createInsecure())

const fetchSchedule = ({ days, shiftSlots, staffDicts }) => {
  return new Promise<StaffsSchedules>((resolve, reject) => {
    client.GenerateSchedule({ days, shiftSlots, staffDicts }, (err, response) => {
      if (err) {
        return reject(err)
      }
      const staffSchedules = Object.entries(response.schedules)
        .map(([key, value]) => ({ [key]: value.schedule }))
        .reduce((obj, value) => Object.assign(obj, value), {})
      return resolve(staffSchedules)
    })
  });
}

export const generateSchedule = async ({ days, shiftSlots, staffDicts }: GenerateScheduleInput) => {
  try {
    const result = await fetchSchedule({ days, shiftSlots, staffDicts })
    console.log(result)
    return result
  } catch (error) {
    console.error("ERROR:" + error);
  }
}

generateSchedule({ days, shiftSlots, staffDicts })