const express = require('express');
const bodyParser = require('body-parser');

const server = express();
server.use(express.static('public'));
server.use(bodyParser.json());

server.post('/check-form', require('./controllers/check-form'));

server.listen(8010);