process.env.NODE_ENV = 'production'
process.env.NODE_APP_INSTANCE = 3;
const compression = require('compression')
const express = require('express');
const path = require('path');
// const morgan = require('morgan');
const router = require('./routes.js');

const server = express();
server.use(compression())

const port = process.env.port||3003;

// server.use(morgan('dev'))


server.use(express.json()) // for parsing application/json
server.use(express.urlencoded({ extended: true })) // for parsing 

server.use(express.static(path.join(__dirname, '../client/dist')))


server.use('/morelooks', router)


server.listen(port, () => console.log(`listening on port ${port}`))

