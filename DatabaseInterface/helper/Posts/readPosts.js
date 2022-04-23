const { getClient } = require('../getClient');

async function readPosts() {
  const client = await getClient();
  let results;
  try{
    results = await client.query('SELECT * FROM \"Posts\";');
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results.rows;
};

module.exports = {
  readPosts
}