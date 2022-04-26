const { getClient } = require('../getClient');

async function readChats() {
  const client = await getClient();
  let results;
  try{
    results = await client.query('SELECT * FROM \"Chats\";');
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results.rows;
};

module.exports = {
  readChats
}