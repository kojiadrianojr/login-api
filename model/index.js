const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL,  { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    return !err? console.log('Connected to Database Succesfully!') : console.log('error connecting');
})

