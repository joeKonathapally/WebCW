const { getClient } = require('../getClient');
const timestamp = require('time-stamp');

async function updateEvent(eventTitle, message, id) {
  // console.log(message, id);
  const client = await getClient();
  try{
    let tp = timestamp('YYYY/MM/DD:mm:ss');
    let results = await client.query('UPDATE \"Events\" SET \"Message\" = $1, \"UpdatedAt\" = $2, \"EventTitle\" = $4 WHERE \"EventID\" = $3;', [`${message}`, `${tp}`, `${id}`, `${eventTitle}`]);
  } catch(e) {
    await client.end();
    throw(e)
  }
  await client.end();
  return results;
};

module.exports = {
  updateEvent
}