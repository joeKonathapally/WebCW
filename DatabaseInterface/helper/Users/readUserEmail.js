const { getClient } = require('../getClient');

async function readUserEmail(email) {
  const client = await getClient();
  let results;
  try{
    results = await client.query('SELECT * FROM \"Users\" WHERE \"Email\" = $1;', [`${email}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results.rows;
};

module.exports = {
  readUserEmail
}