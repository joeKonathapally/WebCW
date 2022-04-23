const { readEvent } = require('./readEvent');
const { readEvents } = require('./readEvents');
const { createEvent } = require('./createEvent');
const { deleteEvent } = require('./deleteEvent');
const { updateEvent } = require('./updateEvent');

module.exports = {
  readEvent,
  readEvents,
  createEvent,
  deleteEvent,
  updateEvent
};