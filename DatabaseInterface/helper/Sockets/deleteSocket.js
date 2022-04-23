const { getClient } = require('../getClient');

async function deleteSocket(id) {
  const client = await getClient();
  let results;
  try{
    results = await client.query('DELETE FROM \"Sockets\" WHERE \"UserID\" = $1;', [`${id}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results.rowCount;
};

module.exports = {
  deleteSocket
}