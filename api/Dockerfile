
FROM node:10.15.0
WORKDIR /usr/server
COPY package*.json /usr/server/

RUN npm install --silent
COPY . .

CMD ["npm", "run", "dev"]