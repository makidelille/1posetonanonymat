FROM node:10

LABEL Author="Makidelille"

RUN mkdir /app && mkdir /app/img
WORKDIR /app

COPY package.json .
RUN npm ci

COPY src .
COPY static .
COPY views .

EXPOSE 3000
CMD [ "node" "src/server.js" ]