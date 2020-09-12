const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.user(bodyParser.json());

app.get('/', (req, res) => res.send("Hello from express"));

app.listen(3000, () => {
  console.log("server is up and running");
});