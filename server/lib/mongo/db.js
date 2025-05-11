require('dotenv').config()
const mongoose = require('mongoose')
const {Team,Player} = require('./schema.js');

mongoose.connect(process.env.MONGO_URI); // mongoose connection

// create new player
const player = new Player({
    p_id:124,
    created_date: Date.now(),
    player_name:"Maurice",
    wins:3,
    losses:4,
    total:7
})

// const saveData = async () => await player.save();

// saveData();

