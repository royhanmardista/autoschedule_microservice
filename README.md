# autoschedule_microservice

## Set up for local development
- Make sure you run kraken on docker, since this microservice will attach its network to it. You can check the network using `docker network ls` and see if kraken_default is present
- go to scripts directory and `chmod +x build_docker.sh` run `./build_docker.sh`
- to run with the node client go to client folder
- install dependency 
- run tsc main.ts
- run node main.js

## Deploy to production
- go to scripts directory and `chmod +x deploy_docker.sh` run `./deploy_docker.sh`