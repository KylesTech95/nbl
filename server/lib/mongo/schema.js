require('dotenv').config()
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

//create schema
// player schema
const playerSchema = new Schema({
    p_id:Number, // id
    created_date:Date, // data created
    player_name:String, // player name 
})
// stats schema
const statsSchema = new Schema({
    p_id:Number,
    wins:Number, // wins
    losses:Number, // losses
    total_games:Number,
    points:Number,
    assists:Number,
    steals:Number,
    turnovers:Number,
    
})
// team schema
const teamSchema = new Schema({
    t_id:Number, // id
    players:[String], // array of names
    created_date:Date, // data created
})

// gameSchema
// Create on 2025-05-13T01:41:05.070Z
const gameSchema = new Schema({
g_id:String,
location:String,
created_date:Date,
active:Boolean,
completed:Boolean,
canceled:Boolean,
duration:Number
})
//_____________________________________schema_end

// create model
const Player = model("Player", playerSchema);
const Stats = model("Stat", statsSchema)
const Team = model("Team", teamSchema);
const Game = model("Game", gameSchema);

module.exports = { Team, Stats , Player , Game }


