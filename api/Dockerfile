FROM node:16

WORKDIR /Newbie-Foodie-api
COPY package.json .
COPY .env .
RUN npm install
COPY . .
CMD npm start