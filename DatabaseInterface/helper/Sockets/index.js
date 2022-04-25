const { readSocket } = require('./readSocket');
const { readSockets } = require('./readSockets');
const { readSocketID } = require('./readSocketID');
const { readSocketSID } = require('./readSocketSID');
const { createSocket } = require('./createSocket');
const { deleteSocket } = require('./deleteSocket');
const { updateSocket } = require('./updateSocket');

module.exports = {
  readSocket,
  readSockets,
  readSocketID,
  readSocketSID,
  createSocket,
  deleteSocket,
  updateSocket
};