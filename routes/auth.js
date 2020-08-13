const express = require('express');
const route = express.Router();
const json = require('body-parser/lib/types/json');

route.get('/', (req, res) => res.send('HELLO WOLRD'));


module.exports = route;