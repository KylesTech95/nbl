require('dotenv').config();
const { Team, Stats , Player, Game, Reservation, Event } = require('./lib/mongo/schema.js')
const { saveData,createInstance, updateOne, updateMany, findAll,findOne, deleteAll } = require('./lib/mongo/crud.js')
const { createEvent } = require('./lib/mongo/db.js')
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

/* -------------------------------------------------- */
// template details 
let gameDetails = {
        dealer:null, // the id (p_id) of the dealer
        winning_score:0,
        losing_acore:0,
        winners:[], // 5 players = 1 team
        losers:[], // array of IDs (p_id)
    }
let eventDetails = {
    start_date:null,
    end_date:null,
    start_time:null,
    end_time:null,
}
let default_options = {
    canceled:false,
    completed:false,
    rescheduled:false,
}
let approvalDetails = { // keep details for reservation
        approvedBy: null, // Reference to admin user who approved
        approvedAt: null,
        deniedBy: null,
        deniedAt: null,
        reason: null // Optional: reason for denial
}
/* -------------------------------------------------- */

// set view engine
app.set('view engine', ejs)
app.set('views', path.join(__dirname,'..','public'))

// middleware
app.use(express.static(path.join(__dirname,'..','public')))
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


// routes
app.route('/').get((req,res)=>{
    // if the path is actually home
    if(/^\/$/.test(req.path) && req.path.length===1){
        res.render('index',{
            test:'test',
            navlinks:Object.keys(navigation).filter(str => navigation[str]['open']),
            dirspace:false, // determines
            authenticated:false,
            create:true,
        })
    }
})

app.route('/event/read/:id').get(async(req,res)=>{
    const {id} = req.params;

    try{
        const findById = await findOne(Event,{_id:id});
        console.log(findById)
        // render ejs
        res.render('partials/read_event.ejs',{
            event_data:findById,
            navlinks:Object.keys(navigation).filter(str => navigation[str]['open']),
            dirspace:true, // determines 
            authenticated:false,
            create:false,
        })
    }
    catch(err){
        throw new Error(err)
    }
})
app.route('/event/create').post((req,res)=>{
    let {
        event_name,
        event_description,
        event_start_date,
        event_end_date,
        event_start_time0,
        event_start_time1,
        event_start_time2,
        event_start_time3,
        event_end_time0,
        event_end_time1,
        event_end_time2,
        event_end_time3} = req.body;
    let payload = {};
    payload.id = '31e33d31';
    payload.name = event_name;
    payload.description = event_description;
    payload.createdAt = Date.now();
    payload.updatedAt = null;
    // event details
    eventDetails.start_date = event_start_date;
    eventDetails.end_date = event_end_date;
    eventDetails.start_time = `${event_start_time0}${event_start_time1}:${event_start_time2}${event_start_time3}`
    eventDetails.end_time = `${event_end_time0}${event_end_time1}:${event_end_time2}${event_end_time3}`

    payload.eventDetails = eventDetails
    payload = {...payload,...default_options}

    // console.log(payload)
    createEvent(payload);
    
    res.redirect('/event/list/all')
    // res.json(payload);
})
app.route('/event/list/:parameter').get(async(req,res)=>{
    const paramStatus = ['all','upcoming','completed','canceled'];
    const {parameter} = req.params;
    try{
        // get list of events from db
        const events = await findAll(Event); // array of events
        // console.log(events)
        res.render('events.ejs',{
            navlinks:Object.keys(navigation).filter(str => navigation[str]['open']),
            event_data:events, // array of events
            dirspace:false, // determines 
            authenticated:false,
            parameter:!paramStatus.find(p=>new RegExp(p,'ig').test(parameter)) ? undefined : parameter,
            create:true,
        })
    }
    catch(err){
        throw new Error(err)
    }
})
app.route('/events/all').get(async(req,res)=>{
    
    try{
        // get list of events from db
        const events = await findAll(Event); // array of events
        res.json({data:events})
    }
    catch(err){
        throw new Error(err)
    }
})


app.route('/media/:type').get((req,res)=>{
    const {type} = req.params;
    let dir, len, payload;

    switch(true){
        case type==='gif':
        dir = readdirSync(path.resolve(__dirname,'../public/media/' + type),'utf-8');
        len = dir.length;
        break;

        case type==='png':
        dir = readdirSync(path.resolve(__dirname,'../public/media/' + type),'utf-8');
        len = dir.length;
        break;

        default:
            console.log(undefined);
    }
    // console.log(dir)
    // console.log(type)
        payload = {dir:dir,length:len};
        // return
        res.json(payload);
})

app.route('/option/select/:val').get((req,res)=>{
    
    let {val} = req.params;
    // since None is not an option, decrement value by 1
    val--
    // console.log(val);
    res.json({val:val})
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
