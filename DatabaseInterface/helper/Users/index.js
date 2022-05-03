const { readUser } = require('./readUser');
const { readUserEmail } = require('./readUserEmail');
const { readUserName } = require('./readUserName');
const { readUsers } = require('./readUsers');
const { createUser } = require('./createUser');
const { deleteUser } = require('./deleteUser');
const { updateUser } = require('./updateUser');

module.exports = {
  readUser,
  readUserEmail,
  readUserName,
  readUsers,
  createUser,
  deleteUser,
  updateUser
};