FROM node:18-alpine

WORKDIR /usr/app

COPY ./package*.json .

RUN npm install

COPY . .

RUN npm run prisma:generate

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
