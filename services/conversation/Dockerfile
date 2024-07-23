FROM node:18-alpine

WORKDIR /usr/app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate 

EXPOSE 4001

CMD [ "npm", "run", "start"]