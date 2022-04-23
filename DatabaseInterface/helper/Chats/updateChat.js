const { getClient } = require('../getClient');
const timestamp = require('time-stamp');

async function updateChat(eventTitle, message, id) {
  // console.log(message, id);
  const client = await getClient();
  try{
    let tp = timestamp('YYYY/MM/DD:mm:ss');
    let results = await client.query('UPDATE \"Chats\" SET \"Message\" = $1, \"UpdatedAt\" = $2 WHERE \"ChatID\" = $3;', [`${message}`, `${tp}`, `${id}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results;
};

module.exports = {
  updateChat
}