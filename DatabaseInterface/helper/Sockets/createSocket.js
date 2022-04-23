const { getClient } = require('../getClient');
const timestamp = require('time-stamp');

async function createSocket(socketId, userId, state) {
  const client = await getClient();
  try{
    let results = await client.query('INSERT INTO \"Sockets\" VALUES(DEFAULT, $1, $2, $3, $4, $5);', [`${socketId}`, `${userId}`, `${state}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results;
};

module.exports = {
  createSocket
}