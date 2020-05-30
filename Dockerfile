FROM node:10

LABEL Author="Makidelille"

RUN mkdir /app && mkdir /app/img
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY src src
COPY static static
COPY views views

EXPOSE 3000
CMD [ "node", "./src/server.js" ]