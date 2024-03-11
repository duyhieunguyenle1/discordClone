FROM node:21.1.0-alpine3.17

WORKDIR /usr/src/app

COPY ["package.json","yarn.lock","tsconfig.json",".env","./"]

COPY ./src ./src

RUN yarn install

EXPOSE 5002

CMD yarn dev