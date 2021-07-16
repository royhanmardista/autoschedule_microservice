FROM python:3.7-buster

WORKDIR /autoschedule_microservice
COPY ./app/requirements.txt /autoschedule_microservice/requirements.txt
RUN pip3 install -r requirements.txt

RUN pip3 install wheel
RUN pip3 install gunicorn

COPY .env /autoschedule_microservice/.env
COPY ./app /autoschedule_microservice

CMD ["gunicorn", "--config", "gunicorn_config.py", "server:app"]