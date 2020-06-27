// /index.js

const path = require('path');
require('dotenv').config();

const { PORT = 3000 } = process.env
const express = require('express');
const server = express();

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));

const { client } = require('./db');
client.connect();

const PUBLIC_PATH = path.join(__dirname, './public');

server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
});

server.use(express.static(PUBLIC_PATH));
server.use(express.json());

const apiRouter = require('./api');
server.use('/api', apiRouter);


