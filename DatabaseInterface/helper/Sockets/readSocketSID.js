const { getClient } = require('../getClient');

async function readSocketSID(id) {
  const client = await getClient();
  let results;
  try{
    results = await client.query('SELECT * FROM \"Sockets\" WHERE \"SID\" = $1;', [`${id}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results.rows;
};

module.exports = {
  readSocketSID
}