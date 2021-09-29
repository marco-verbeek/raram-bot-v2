FROM node:latest
WORKDIR /usr/src/bot

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY ./dist ./dist

CMD ["node", "dist/src/index"]
