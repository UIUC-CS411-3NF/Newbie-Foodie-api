FROM node:16

WORKDIR /Newbie-Foodie-api
COPY package.json .
COPY .env .
RUN npm install
RUN npm install -g nodemon
COPY . .
CMD npm run start