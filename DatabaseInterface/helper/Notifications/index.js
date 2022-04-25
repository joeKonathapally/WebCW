const { readNotification } = require('./readNotification');
const { readNotifications } = require('./readNotifications');
const { createNotification } = require('./createNotification');
const { deleteNotification } = require('./deleteNotification');
const { updateNotification } = require('./updateNotification');

module.exports = {
  readNotification,
  readNotifications,
  createNotification,
  deleteNotification,
  updateNotification
};