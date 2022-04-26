const { getClient } = require('../getClient');

async function updateChatRoomMembership(ChatRoomID, CRMID) {
  const client = await getClient();
  try{
    let results = await client.query('UPDATE \"ChatRoomMemberships\" SET \"ChatRoomID\" = $1 WHERE \"CRMID\" = $2;', [`${ChatRoomID}`, `${CRMID}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results;
};

module.exports = {
  updateChatRoomMembership
}