const { getClient } = require('../getClient');

async function deleteChat(id) {
  const client = await getClient();
  let results;
  try{
    results = await client.query('DELETE FROM \"Chats\" WHERE \"ChatID\" = $1;', [`${id}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results.rowCount;
};

module.exports = {
  deleteChat
}