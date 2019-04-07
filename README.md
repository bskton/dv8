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
To run e2e tests in Chrome executed outside of the docker container 
create files e2e/environments/environment.ts and src/environments/environment.e2e.ts.
To run all test execute
```
ng e2e
```
To run a suite execute
```
ng e2e --suite <suite-name>
```
See the list of suites in e2e/protractor.conf.js
To execute e2e tests you need angular cli to be installed globally on our computer.

## Updating or installing packages without docker-compose

If docker-compose doesn't start use docker command to update packages
```
docker run --rm -it -v $PWD:/app -u $(id -u):$(id -g) node:10.11.0 bash
npm update --dev
```
or to install packages
```
docker run --rm -it -v $PWD:/app -u $(id -u):$(id -g) node:10.11.0 bash
npm install
```

## Password restore feature

Before use the password reset feature, you should set correct URL 
for a password reset template in Firebase Console.