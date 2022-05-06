FROM node:latest
RUN mkdir node
COPY . ./node
WORKDIR ./node/
RUN npm install
EXPOSE 2000
CMD node server.js