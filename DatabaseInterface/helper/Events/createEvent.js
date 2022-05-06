const { getClient } = require('../getClient');
const timestamp = require('time-stamp');

async function createEvent(eventTitle, message, createdByID) {
  
  console.log(typeof createdByID)
  const client = await getClient();
  try{
    let tp = timestamp('YYYY/MM/DD:mm:ss');
    let results = await client.query('INSERT INTO \"Events\" VALUES(DEFAULT, $1, $2, $3, $4, $5);', [`${eventTitle}`, `${message}`, `${tp}`, `${tp}`, `${createdByID}`]);
  } catch(e) {
    console.log(e)
    await client.end();
    throw(e)
  }
  await client.end();
  return results;
};

module.exports = {
  createEvent
}