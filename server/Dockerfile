FROM node:10-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
USER node
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "node", "server.js" ]