FROM node:carbon

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3500
CMD [ "npm", "run bundle"]
CMD [ "npm", "start" ]
