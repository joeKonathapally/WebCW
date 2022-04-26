const { getClient } = require('../getClient');

async function createChatRoomMembership(ChatRoomType, UserID, ChatRoomID) {
  const client = await getClient();
  try{
    let results = await client.query('INSERT INTO \"ChatRoomMemberships\" VALUES(DEFAULT, $1, $2, $3);', [`${ChatRoomID}`, `${UserID}`, `${ChatRoomType}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results;
};

module.exports = {
  createChatRoomMembership
}