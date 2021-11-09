FROM node:16

WORKDIR /Newbie-Foodie-api

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]