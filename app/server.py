import os
import sys
import logging
from dotenv import load_dotenv
from concurrent import futures
from google.protobuf import json_format

import grpc

load_dotenv()
port = os.getenv('PORT')
sys.path.append('./autoschedule')
from generate_schedule import AutoSchedule 
import autoschedule_pb2_grpc as autoscheduleService

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    autoscheduleService.add_AutoScheduleServicer_to_server(AutoSchedule(), server)
    server.add_insecure_port('[::]:' + port)
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    logging.basicConfig()
    serve()