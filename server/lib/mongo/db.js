require('dotenv').config()
const mongoose = require('mongoose')
const { Team,Player } = require('./schema.js');

mongoose.connect(process.env.MONGO_URI) // mongoose connection

// let player = new Player({
//     p_id:34,
//     created_date:new Date().toISOString(),
//     wins:34,
//     losses:23,
//     total:57
// })
// // save data
// const saveData = async (data) => {
//     await data.save();
//     process.nextTick(()=>process.exit(0))
// }
// saveData(player) // save player
