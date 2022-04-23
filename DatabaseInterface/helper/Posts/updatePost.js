const { getClient } = require('../getClient');
const timestamp = require('time-stamp');

async function updatePost(message, id) {
  console.log(message, id);
  const client = await getClient();
  try{
    let tp = timestamp('YYYY/MM/DD:mm:ss');
    let results = await client.query('UPDATE \"Posts\" SET \"Message\" = $1, \"UpdatedAt\" = $2 WHERE \"PostID\" = $3;', [`${message}`, `${tp}`, `${id}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results;
};

module.exports = {
  updatePost
}