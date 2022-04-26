const { getClient } = require('../getClient');
const timestamp = require('time-stamp');

async function updateChatRoom(title, id) {
  const client = await getClient();
  try{
    let tp = timestamp('YYYY/MM/DD:mm:ss');
    let results = await client.query('UPDATE \"ChatRooms\" SET \"Title\" = $1 WHERE \"ChatRoomID\" = $2;', [`${title}`, `${id}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results;
};

module.exports = {
  updateChatRoom
}