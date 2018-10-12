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
```
ng e2e --port 4201
```
To execute e2e tests you need angular cli to be installed globally on our computer.