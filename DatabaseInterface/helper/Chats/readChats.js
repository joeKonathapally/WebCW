const { getClient } = require('../getClient');

async function readEvents() {
  const client = await getClient();
  let results;
  try{
    results = await client.query('SELECT * FROM \"Events\";');
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results.rows;
};

module.exports = {
  readEvents
}