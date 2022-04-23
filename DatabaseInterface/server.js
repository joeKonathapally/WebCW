// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const postRoutes = require('./routes/postRoutes');
const eventRoutes = require('./routes/eventRoutes');

const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.use('/users', userRoutes);
app.use('/chats', chatRoutes);
app.use('/events', eventRoutes);
app.use('/posts', postRoutes);

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});