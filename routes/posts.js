const route = require('express').Router();


route.get('/', (req, res) => res.send('POSTS'));

module.exports = route;