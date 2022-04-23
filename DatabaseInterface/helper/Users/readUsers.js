const { getClient } = require('../getClient');

async function readUsers() {
  const client = await getClient();
  let results;
  try{
    results = await client.query('SELECT * FROM \"Users\";');
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results.rows;
};

module.exports = {
  readUsers
}