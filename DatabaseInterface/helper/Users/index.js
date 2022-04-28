const { readUser } = require('./readUser');
const { readUserEmail } = require('./readUserEmail');
const { readUsers } = require('./readUsers');
const { createUser } = require('./createUser');
const { deleteUser } = require('./deleteUser');
const { updateUser } = require('./updateUser');

module.exports = {
  readUser,
  readUserEmail,
  readUsers,
  createUser,
  deleteUser,
  updateUser
};