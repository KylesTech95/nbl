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
// Create on 2025-05-12T14:43:57.774Z
const oneSchema = new Schema({
one:String,
two:Number,
three:[Date]
})

// CarSchema
// Create on 2025-05-12T14:45:39.892Z
const CarSchema = new Schema({
brand:String,
model:String,
year:Number,
milage:Number
})
//_____________________________________schema_end

// create model
const Player = model("Player", playerSchema);
const Team = model("Team", teamSchema);
const One = model("One", oneSchema);
const Car = model("Car", CarSchema);

module.exports = { Team, Player , One , Car }

