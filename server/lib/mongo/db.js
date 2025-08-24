require('dotenv').config()
const mongoose = require('mongoose')
const { Team, Stats , Player, Game, Reservation } = require('./schema.js');
const { saveData,createInstance, updateOne, updateMany} = require('./crud.js')
const approvalDetails = { // keep details for reservation
        approvedBy: null, // Reference to admin user who approved
        approvedAt: null,
        deniedBy: null,
        deniedAt: null,
        reason: null // Optional: reason for denial
}

// mongoose connection
mongoose.connect(process.env.MONGO_URI) // mongoose connection


// create mock reservation
// const cookout = createInstance(Reservation, {
//     r_id:'fj9jf239f',
//     firstname:'Sean',
//     lastname:'Mason',
//     email:'smason@user.com',
//     createAt:Date.now(),
//     updatedAt:Date.now() + 180000,
//     canceled:false,
//     approvalDetails
// })

// saveData(cookout)
// create instance
// let player1 = createInstance(Player,{
//     p_id:21,
//     created_date:new Date().toISOString(),
//     player_name:"Sasquach"
// })
// let game = createInstance(Game,{g_id:'34242re',duration:1200,active:true,canceled:false,completed:false, location:"Kentucky Bale"})
// saveData(game);
// let game1 = createInstance(Game, {
//     g_id:'njf3uj24',
//     location:"Nautica Sound",
//     active:false,
//     completed:false,
//     canceled:false,
//     duration:0
// })

// saveData(game1)

// update instance 
// updateOne(Game,{g_id:'njf3uj24'},{canceled:true})
// updateOne(Player,{p_id:{$lte:40}},{player_name:"Chawlk"})
// updateOne(Player,{player_name:'Mark'},{$set: {p_id:102}})
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
