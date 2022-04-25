const { getClient } = require('../getClient');

async function createSocket(socketId, userId, state) {
  const client = await getClient();
  let results;
  try{
    results = await client.query('INSERT INTO \"Sockets\" VALUES(DEFAULT, $1, $2, $3);', [`${socketId}`, `${userId}`, `${state}`]);
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