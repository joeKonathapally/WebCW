const { getClient } = require('../getClient');

async function readNotificationUID(id) {
  const client = await getClient();
  let results;
  try{
    results = await client.query('SELECT * FROM \"Notifications\" WHERE \"UserID\" = $1;', [`${id}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results.rows;
};

module.exports = {
  readNotificationUID
}