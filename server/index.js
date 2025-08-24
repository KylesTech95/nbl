const express = require('express');
const app = express();
const port = 5535;
const cors = require('cors')
const path = require('path')
const bp = require('body-parser')

// middleware
app.use(cors())
app.use(bp.urlencoded())
app.use(express.json())
app.use(express.static(path.join(__dirname,'../public')))


// route
// app.route('/').get((req,res)=>{
//     res.send('Hello NBL');
// })




app.listen((port),()=>{
    console.log('listening on port: ' + port)
})