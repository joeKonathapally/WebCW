const { getClient } = require('../getClient');

async function readNotifications() {
  const client = await getClient();
  let results;
  try{
    results = await client.query('SELECT * FROM \"Notifications\";');
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results.rows;
};

module.exports = {
  readNotifications
}