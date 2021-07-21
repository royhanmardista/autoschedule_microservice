import os
import sys
import logging

import grpc
from concurrent import futures
from dotenv import load_dotenv
from google.protobuf import json_format

load_dotenv()
port = os.getenv('PORT')
sys.path.append('./gRPC_services/autoschedule')
from generate_schedule import add_service_to_server 

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    add_service_to_server(server)
    server.add_insecure_port('[::]:' + port)
    server.start()
    server.wait_for_termination()

def setup_logger():
    handlers = [logging.FileHandler('./logs/myapp.log'), logging.StreamHandler()]
    logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s %(name)-s [%(levelname)-s] %(message)s',
                    datefmt='%m-%d %H:%M',
                    handlers=handlers)

if __name__ == '__main__':
    setup_logger()
    logging.info('Api is up and running')
    serve()