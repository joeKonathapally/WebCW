const { getClient } = require('../getClient');
const timestamp = require('time-stamp');

async function createNotification(Payload, UserID) {
  const client = await getClient();
  let results;
  try{
    let tp = timestamp('YYYY/MM/DD:mm:ss');
    results = await client.query('INSERT INTO \"Notifications\" VALUES(DEFAULT, $1, $2, $3);', [`${Payload}`, `${UserID}`, `${tp}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results;
};

module.exports = {
  createNotification
}