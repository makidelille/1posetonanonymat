FROM node:10

LABEL Author="Makidelille"

RUN mkdir /app && mkdir /app/img
WORKDIR /app

COPY package*.json .
RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD [ "node", "./src/server.js" ]