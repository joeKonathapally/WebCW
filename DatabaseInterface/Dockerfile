FROM node:latest
RUN mkdir node
COPY . ./node
WORKDIR ./node/
RUN npm install
EXPOSE 4000
CMD node server.js