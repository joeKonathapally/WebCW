const { getClient } = require('../getClient');

async function readEvent(id) {
  const client = await getClient();
  let results;
  try{
    results = await client.query('SELECT * FROM \"Events\" WHERE \"EventID\" = $1;', [`${id}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results.rows;
};

module.exports = {
  readEvent
}