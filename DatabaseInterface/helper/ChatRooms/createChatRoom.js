const { getClient } = require('../getClient');
const timestamp = require('time-stamp');

async function createChatRoom(title, createdByID, chatRoomType) {
  const client = await getClient();
  try{
    let tp = timestamp('YYYY/MM/DD:mm:ss');
    let results = await client.query('INSERT INTO \"ChatRooms\" VALUES(DEFAULT, $1, $5, $2, $3, $4);', [`${title}`, `${tp}`, `${chatRoomType}`, `${createdByID}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results;
};

module.exports = {
  createChatRoom
}