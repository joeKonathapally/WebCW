const { readUser } = require('./readUser');
const { readUsers } = require('./readUsers');
const { createUser } = require('./createUser');
const { deleteUser } = require('./deleteUser');
const { updateUser } = require('./updateUser');

module.exports = {
  readUser,
  readUsers,
  createUser,
  deleteUser,
  updateUser
};