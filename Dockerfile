FROM node:14
WORKDIR /usr/src/app
COPY ./server/package*.json ./server/app.js ./
COPY ./public .
RUN npm install
RUN npm run clean
RUN npm run build
EXPOSE 3000
CMD ["node", "app.js"]
