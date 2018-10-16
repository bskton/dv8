# DV8

## Development environment
```
docker-compose up
```
## Testing
```
docker-compose exec app bash
ng test
```

## E2E tesing
To run e2e tests in Chrome execute outside of the docker container 
create files e2e/environments/environment.ts and src/environments/environment.e2e.ts.
Then run
```
ng e2e
```
To execute e2e tests you need angular cli to be installed globally on our computer.

## Upgrading packages
```
docker run --rm -it -v $PWD:/app -u $(id -u):$(id -g) node:10.11.0 bash
npm upgrade
```