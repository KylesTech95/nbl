require('dotenv').config()
const mongoose = require('mongoose')
const { Team, Stats , Player, Game, Reservation, Event } = require('./schema.js');
const { saveData,createInstance, updateOne, updateMany, findAll, deleteAll } = require('./crud.js')

// mongoose connection
mongoose.connect(process.env.MONGO_URI) // mongoose connection











// find data
// const op1 = {name:/cook/g};
// const op2= {firstname:/cook/g};
// const op3 = {email:/cook/g};
// findAll(Event,op2)


// create event
function createEvent(payload){
        const event = createInstance(Event, payload);
        saveData(event)
}

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

// let game2 = createInstance(Game, {
//     g_id:'3d99jhd',
//     location:"Beverly Hills",
//     active:false,
//     completed:true,
//     canceled:false,
//     duration:10800000,
//     createAt:Date.now(),
//     updatedAt:Date.now() + 10800000,
//     gameDetails: {
//         dealer:'9fh83883h', // the id (p_id) of the dealer
//         winning_score:11,
//         losing_acore:10,
//         winners:['19fdj93','fef9939','feew993f','fee3939','f22f23f'], // 5 players = 1 team
//         losers:['123123fe','32r3233','f2f2432','23re23rfo','ddsddd99d'], // array of IDs (p_id)
//     }
// })

// saveData(game2)

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

// deleteAll(Event);


module.exports = {createEvent}

