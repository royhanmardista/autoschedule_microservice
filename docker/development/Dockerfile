FROM python:3.7-buster

WORKDIR /autoschedule_microservice
COPY ./app/requirements.txt /autoschedule_microservice/requirements.txt
RUN pip3 install -r requirements.txt
RUN python3 -m pip install --upgrade --user ortools

COPY .env /autoschedule_microservice/.env
COPY ./app /autoschedule_microservice

CMD ["python3", "server.py"]
# CMD ["ping", "localhost"]