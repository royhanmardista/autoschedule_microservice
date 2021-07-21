import logging
from concurrent import futures
from google.protobuf import json_format

import grpc

import autoschedule_pb2 as autoschedule_message
import autoschedule_pb2_grpc as autoschedule_service
from model import generate_schedule

def convert_schedule_to_buff(schedules):
  for key, value in schedules.items():
      schedules[key] = autoschedule_message.Schedule(schedule = value)
  return schedules

def convert_days_to_list(days):
  for key, value in days.items():
      days[key] = list(range(value['start'], value['end']))
  return days

def add_service_to_server(server):
  autoschedule_service.add_AutoScheduleServicer_to_server(AutoSchedule(), server)

class AutoSchedule(autoschedule_service.AutoScheduleServicer):
    def GenerateSchedule(self, request, context):
        generate_schedule_input = json_format.MessageToDict(request)
        days = convert_days_to_list(generate_schedule_input['days'])
        shiftSlots = generate_schedule_input['shiftSlots']
        staffDicts = generate_schedule_input['staffDicts']
        schedules = generate_schedule(days, shiftSlots, staffDicts)
        return autoschedule_message.GenerateScheduleOutput(schedules = convert_schedule_to_buff(schedules))
