import multiprocessing
import os
from dotenv import load_dotenv

load_dotenv()
port = os.getenv('PORT')
bind = "0.0.0.0:"+port
workers = multiprocessing.cpu_count() * 2 + 1
threads = workers
timeout = 120
