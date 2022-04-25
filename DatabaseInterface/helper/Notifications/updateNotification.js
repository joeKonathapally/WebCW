const { getClient } = require('../getClient');

async function updateNotification(Payload, id) {
  const client = await getClient();
  let results;
  try{
    results = await client.query('UPDATE \"Notifications\" SET \"Payload\" = $1 WHERE \"NotificationID\" = $2;', [`${socketId}`, `${id}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results;
};

module.exports = {
  updateNotification
}