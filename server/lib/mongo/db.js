require('dotenv').config()
const mongoose = require('mongoose')
const { Team, Stats , Player } = require('./schema.js');
const { saveData,createInstance, updateInstance, updateMany } = require('./crud.js')

// mongoose connection
mongoose.connect(process.env.MONGO_URI) // mongoose connection


// create instance
let player1 = createInstance(Player,{
    p_id:21,
    created_date:new Date().toISOString(),
    player_name:"Sasquach"
})

// update instance 
// updateInstance(Player,{p_id:{$lte:40}},{player_name:"Chawlk"})
// updateInstance(Player,{player_name:'Mark'},{$set: {p_id:102}})
// saveData(player1) // save player

// update many instances
// updateMany(Player,{p_id:{$gte: 20}},{$set: {player_name:'name_updated'}})










//__________________________________stats
// let stats = new Stats({
//     p_id:45,
//     wins:34,
//     losses:23,
//     total:57
// })
// console.log(stats)
// saveData(stats) // save stats
