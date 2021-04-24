# Self Heal Library using Healenium
## Installation
### Install dependencies and start healenium backend
Download [Example of compose descriptor](https://github.com/healenium/healenium-client/blob/master/example/docker-compose.yaml) into your test project 
```
$ curl  https://raw.githubusercontent.com/healenium/healenium-client/master/example/docker-compose.yaml  -o docker-compose.yaml
```

Create /db/sql folder on the same level in your project. Add [init.sql file](https://github.com/healenium/healenium-client/blob/master/example/init.sql) into ./db/sql/init.sql folder in your project
```
$ curl https://raw.githubusercontent.com/healenium/healenium-client/master/example/init.sql -o init.sql
```
To start hlm-backend and simply run docker-compose 
```
docker-compose up -d
```
Verify that hlm-backend:latest and postgres docker containers are up and running:
```
docker ps
```
### Install selfheal library
Install Node.js and npm

Clone the repository

Install Packages
```
npm install
```
## Execute Example
### Node.js example
```
node example-node.js
```
### Playwright example
```
node example-playwright.js
```
