const { readNotification } = require('./readNotification');
const { readNotificationUID } = require('./readNotificationUID');
const { readNotifications } = require('./readNotifications');
const { createNotification } = require('./createNotification');
const { deleteNotification } = require('./deleteNotification');
const { updateNotification } = require('./updateNotification');

module.exports = {
  readNotification,
  readNotificationUID,
  readNotifications,
  createNotification,
  deleteNotification,
  updateNotification
};