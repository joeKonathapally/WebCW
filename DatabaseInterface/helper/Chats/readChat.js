const { getClient } = require('../getClient');

async function readChat(id) {
  const client = await getClient();
  let results;
  try{
    results = await client.query('SELECT * FROM \"Chats\" WHERE \"ChatID\" = $1;', [`${id}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results.rows;
};

module.exports = {
  readChat
}