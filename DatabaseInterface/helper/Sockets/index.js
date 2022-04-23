const { readSocket } = require('./readSocket');
const { readSockets } = require('./readSockets');
const { createSocket } = require('./createSocket');
const { deleteSocket } = require('./deleteSocket');
const { updateSocket } = require('./updateSocket');

module.exports = {
  readSocket,
  readSockets,
  createSocket,
  deleteSocket,
  updateSocket
};