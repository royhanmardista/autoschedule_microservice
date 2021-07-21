# autoschedule_microservice

## Set up for local development
- Make sure you run kraken on docker, since this microservice will attach it network to it. You can check the network using `docker network ls` and see if kraken_default is present
- go to scripts directory and `chmod +x build_docker.sh` run `./build_docker.sh`
- to run with the node client go to client folder
- install dependency 
- run tsc main.ts
- run node main.js