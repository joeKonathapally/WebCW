const { getClient } = require('../getClient');

async function readSockets() {
  const client = await getClient();
  let results;
  try{
    results = await client.query('SELECT * FROM \"Sockets\";');
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results.rows;
};

module.exports = {
  readSockets
}