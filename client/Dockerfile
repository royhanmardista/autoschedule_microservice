FROM node:12 as builder

WORKDIR /autoschedule_microservice_client
COPY ./client/package.json /autoschedule_microservice_client/package.json
RUN npm install

COPY ./client /autoschedule_microservice_client

CMD ["ping", "localhost"]