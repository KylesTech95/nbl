require('dotenv').config()
const mongoose = require('mongoose')
const { Team,Player,Stats } = require('./schema.js');
const { saveData } = require('./crud.js')

mongoose.connect(process.env.MONGO_URI) // mongoose connection

// save data Fn
// const saveData = async (data) => {
//     await data.save();
//     process.nextTick(()=>process.exit(0))
// }





let player = new Player({
    p_id:21,
    created_date:new Date().toISOString(),
    player_name:"Joshua"

})
saveData(player) // save player


// let stats = new Stats({
//     p_id:45,
//     wins:34,
//     losses:23,
//     total:57
// })
// console.log(stats)
// saveData(stats) // save stats
