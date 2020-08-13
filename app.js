require('dotenv').config();

const connection = require('./model');
const express = require('express');
const app = express();
const routes = require('./routes');
const bodyparsers = require('body-parser');
const authRoute =  routes.auth;
const PORT = process.env.PORT || 5000;

app.use(bodyparsers.urlencoded({
    extended: true
}))
app.use(express.json());
app.use('/api/auth', authRoute);

app.listen(PORT, () => console.log(`Now Listenong d(^_^)b on port: ${PORT}`))