const { getClient } = require('../getClient');

async function updateSocket(socketId, state, id) {
  const client = await getClient();
  let results;
  try{
    results = await client.query('UPDATE \"Sockets\" SET \"SocketID\" = $1, \"State\" = $2 WHERE \"SID\" = $3;', [`${socketId}`, `${state}`, `${id}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results;
};

module.exports = {
  updateSocket
}