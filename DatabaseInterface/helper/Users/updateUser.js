const { getClient } = require('../getClient');

async function updateUser(username, password, email, usertype, id) {
  console.log(username, password, email, usertype);
  const client = await getClient();
  try{
    let results = await client.query('UPDATE \"Users\" SET \"UserName\" = $1, \"Password\" = $2, \"Email\" = $3, \"UserType\" = $4 WHERE \"UserID\" = $5;', [`${username}`, `${password}`, `${email}`, `${usertype}`, `${id}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results;
};

module.exports = {
  updateUser
}