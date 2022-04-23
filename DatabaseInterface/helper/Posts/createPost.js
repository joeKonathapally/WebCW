const { getClient } = require('../getClient');
const timestamp = require('time-stamp');

async function createPost(message, createdByID) {
  const client = await getClient();
  try{
    let tp = timestamp('YYYY/MM/DD:mm:ss');
    let results = await client.query('INSERT INTO \"Posts\" VALUES(DEFAULT, $1, $2, $3, $4);', [`${message}`, `${tp}`, `${tp}`, `${createdByID}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results;
};

module.exports = {
  createPost
}