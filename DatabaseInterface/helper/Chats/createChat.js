const { getClient } = require('../getClient');
const timestamp = require('time-stamp');

async function createChat(message, createdByID, chatRoomID) {
  const client = await getClient();
  try{
    let tp = timestamp('YYYY/MM/DD:mm:ss');
    let results = await client.query('INSERT INTO \"Chats\" VALUES(DEFAULT, $1, $5, $2, $3, $4);', [`${message}`, `${tp}`, `${tp}`, `${createdByID}`, `${chatRoomID}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results;
};

module.exports = {
  createChat
}