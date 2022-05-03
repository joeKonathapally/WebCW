const { getClient } = require('../getClient');

async function readUserName(name) {
  const client = await getClient();
  let results;
  try{
    results = await client.query('SELECT * FROM \"Users\" WHERE \"UserName\" = $1;', [`${name}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results.rows;
};

module.exports = {
  readUserName
}