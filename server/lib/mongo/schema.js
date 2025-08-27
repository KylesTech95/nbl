require('dotenv').config()
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

//create schema
// player schema
const playerSchema = new Schema({
    p_id:Number, // id
    created_date:Date, // data created
    player_name:String, // player name 
    createdAt:String,
    updatedAt:String,

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
    createdAt:String,
    updatedAt:String,    
})
// team schema
const teamSchema = new Schema({
    createdAt:String,
    updatedAt:String,
    t_id:Number, // id
    players:[String], // array of names
    created_date:Date, // data created
})

// gameSchema
// Create on 2025-05-13T01:41:05.070Z
const gameSchema = new Schema({
g_id:String,
location:String,
createdAt:String,
updatedAt:String,
active:Boolean,
completed:Boolean,
canceled:Boolean,
duration:Number,
gameDetails:Object,
})

const eventSchema = new Schema({
    e_id:String,
    name:String,
    description:String,
    createdAt:String,
    updatedAt:String,
    canceled:Boolean,
    completed:Boolean,
    rescheduled:Boolean,
    eventDetails:Object,
})
const reservationSchema = new Schema({
    r_id:String,
    e_id:String,
    firstname:String,
    lastname:String,
    email:String,
    createdAt:String,
    updatedAt:String,
    canceled:Boolean,
    approvalDetails:Object,
})

// LeaderboardSchema
// Create on 2025-08-26T23:25:59.837Z
const LeaderboardSchema = new Schema({
l_id:String,
leaderboard_type:String,
top5: Array,
createdAt:String,
updatedAt:String,
completed:Boolean,
canceled:Boolean,
player_count:Number,
})
//_____________________________________schema_end

// create model
const Player = model("Player", playerSchema);
const Stats = model("Stat", statsSchema)
const Team = model("Team", teamSchema);
const Game = model("Game", gameSchema);
const Reservation = model("Reservation",reservationSchema);
const Event = model("Event",eventSchema);
const Leaderboard = model("Leaderboard", LeaderboardSchema);

module.exports = { Team, Stats , Player , Game, Reservation, Event , Leaderboard , Leaderboard }




