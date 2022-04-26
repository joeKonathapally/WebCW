const { getClient } = require('../getClient');

async function readChatRooms() {
  const client = await getClient();
  let results;
  try{
    results = await client.query('SELECT * FROM \"ChatRooms\";');
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results.rows;
};

module.exports = {
  readChatRooms
}