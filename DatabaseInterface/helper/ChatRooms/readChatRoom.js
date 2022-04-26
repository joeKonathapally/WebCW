const { getClient } = require('../getClient');

async function readChatRoom(id) {
  const client = await getClient();
  let results;
  try{
    results = await client.query('SELECT * FROM \"ChatRooms\" WHERE \"ChatRoomID\" = $1;', [`${id}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results.rows;
};

module.exports = {
  readChatRoom
}