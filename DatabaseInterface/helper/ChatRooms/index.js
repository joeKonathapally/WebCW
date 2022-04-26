const { readChatRoom } = require('./readChatRoom');
const { readChatRooms } = require('./readChatRooms');
const { createChatRoom } = require('./createChatRoom');
const { deleteChatRoom } = require('./deleteChatRoom');
const { updateChatRoom } = require('./updateChatRoom');

module.exports = {
  readChatRoom,
  readChatRooms,
  createChatRoom,
  deleteChatRoom,
  updateChatRoom
};