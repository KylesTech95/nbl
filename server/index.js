require('dotenv').config();
const {readdirSync} = require('fs')
const express = require('express');
const app = express();
const port = 5535;
const cors = require('cors')
const path = require('path')
const bp = require('body-parser')
// const onedrive = require('onedrive-api')
const ejs = 'ejs'
const dest = { // destination
    reservation:'reservation',
    game:'game'
}
const navigation = require("./lib/common/navigation.json")


// set view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'..','public'))
// middleware
app.use(cors())
app.use(bp.urlencoded())
app.use(express.json())
app.use(express.static(path.join(__dirname,'..','public')))


// route
app.route('/').get((req,res)=>{
    // if the path is actually home
    if(/^\/$/.test(req.path) && req.path.length===1){
        res.render('index',{
            test:'test',
            navlinks:Object.keys(navigation).filter(str => navigation[str]['open']),
        })
    }
})


app.route('/event/select/:val').get((req,res)=>{
    
    const options = ['create_event'];
    let {val} = req.params;
    // since None is not an option, decrement value by 1
    val--

    console.log(val);
    res.json({value:options[val]})
})


// onedrive
// list children of a given root directory

// onedrive.items.listChildren({
//     accessToken: process.env.REG_APP_CLIENT_SEC,
//     itemId: "root",
//     drive: "", // 'me' | 'user' | 'drive' | 'group' | 'site'
//     driveId: "", // BLANK | {user_id} | {drive_id} | {group_id} | {sharepoint_site_id}
//   })
//   .then((childrens) => {
//     console.log(childrens);
//     // list all children of given root directory
//     //
//     // console.log(childrens);
//     // returns body of https://dev.onedrive.com/items/list.htm#response
//   });

/*------------------------------------------- */




app.listen((port),()=>{
    console.log('listening on port: ' + port)
})