require('dotenv').config()
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

//create schema
// player schema
const playerSchema = new Schema({
    p_id:Number, // id
    created_date:Date, // data created
    player_name:String, // player name 
    wins:Number, // wins
    losses:Number, // losses
    total:Number,
})
// team schema
const teamSchema = new Schema({
    t_id:Number, // id
    players:[String], // array of names
    created_date:Date, // data created
})


// oneSchema
// Create on 2025-05-11T20:49:31.065Z
const oneSchema = new Schema({
one:String,
two:Number,
three:[Date]
})

// twoSchema
// Create on 2025-05-11T20:49:31.069Z
const twoSchema = new Schema({
one:String,
two:Number,
three:[Date]
})
//_____________________________________schema_end

// create model
const Player = model("Player", playerSchema);
const Team = model("Team", teamSchema);

const Two = model("Two", twoSchema);
const One = model("One", oneSchema);
