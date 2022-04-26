const { readChat } = require('./readChat');
const { readChats } = require('./readChats');
const { createChat } = require('./createChat');
const { deleteChat } = require('./deleteChat');
const { updateChat } = require('./updateChat');

module.exports = {
  readChat,
  readChats,
  createChat,
  deleteChat,
  updateChat
};