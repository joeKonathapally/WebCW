const { getClient } = require('../getClient');

async function createUser(username, password, email, usertype) {
  const client = await getClient();
  try{
    let results = await client.query('INSERT INTO \"Users\" VALUES(DEFAULT, $1, $2, $3, $4);', [`${username}`, `${password}`, `${email}`, `${usertype}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results;
};

module.exports = {
  createUser
}