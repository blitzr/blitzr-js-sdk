FROM node:latest

ADD . /usr/src/app/

WORKDIR /usr/src/app

RUN npm install

RUN npm run package