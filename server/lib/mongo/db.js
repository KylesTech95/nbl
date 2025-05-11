require('dotenv').config()
const mongoose = require('mongoose')
const {Team,Player} = require('./schema.js');

mongoose.connect(process.env.MONGO_URI); // mongoose connection

