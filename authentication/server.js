// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 2000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});