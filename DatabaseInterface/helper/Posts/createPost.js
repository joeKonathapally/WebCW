const { getClient } = require('../getClient');
const timestamp = require('time-stamp');

async function createPost(message, createdByID) {
  //console.log(message);
  //console.log(createdByID);
  const client = await getClient();
  try{
    let tp = timestamp('YYYY/MM/DD:mm:ss');
    let results = await client.query('INSERT INTO \"Posts\" VALUES(DEFAULT, $1, $2, $3, $4);', [`${message}`, `${tp}`, `${tp}`, `${createdByID}`]);
    // let results = await client.query('INSERT INTO \"Posts\" VALUES(DEFAULT, $1, $2, $3, $4);', [`${message}`, `${tp}`, `${tp}`, createdByID]);
    console.log(results);
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
