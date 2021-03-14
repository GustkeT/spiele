FROM node:10
WORKDIR /app
COPY ./package*.json .
RUN npm install
COPY . /app
CMD node api.js
EXPOSE 8090
