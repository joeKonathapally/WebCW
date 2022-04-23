const { getClient } = require('../getClient');

async function readUser(id) {
  const client = await getClient();
  let results;
  try{
    results = await client.query('SELECT * FROM \"Users\" WHERE \"UserID\" = $1;', [`${id}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results.rows;
};

module.exports = {
  readUser
}