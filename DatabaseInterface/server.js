// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const chatRoomRoutes = require('./routes/chatRoomRoutes');
const chatRoomMembershipRoutes = require('./routes/chatRoomMembershipRoutes');
const postRoutes = require('./routes/postRoutes');
const eventRoutes = require('./routes/eventRoutes');
const socketRoutes = require('./routes/socketRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.use('/users', userRoutes);
app.use('/chats', chatRoutes);
app.use('/events', eventRoutes);
app.use('/posts', postRoutes);
app.use('/sockets', socketRoutes);
app.use('/notifications', notificationRoutes);
app.use('/chatrooms', chatRoomRoutes);
app.use('/chatroommemberships', chatRoomMembershipRoutes);

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});