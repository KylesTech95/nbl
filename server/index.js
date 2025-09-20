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
const passport = require('./lib/passport/strategy.js');
const session = require('express-session')

// const onedrive = require('onedrive-api')
const ejs = 'ejs'
const dest = { // destination
    reservation:'reservation',
    game:'game'
}
const navigation = {
    common:require("./lib/common/navigation.json"),
    admin:require("./lib/admin/navigation.json")
}

const auth = require('./lib/routes/auth.js')

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
app.use(session({
    secret:'secret-key',
    resave:false,
    saveUninitialized:false,
}))
app.use(passport.initialize()) // enable session support for passport
app.use(passport.session()) // enable session support for passport

app.use(express.static(path.join(__dirname,'..','public')))
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/auth',auth)

// routes

// homepage
app.route('/').get((req,res)=>{
    if(1+1==3){ // temp authentication condition
        if(/^\/$/.test(req.path) && req.path.length===1){
        res.render('index',{
            navlinks:Object.keys(navigation['common']).filter(str => !/(Login|Signup)/g.test(str) && navigation['common'][str]['open']),
            dirspace:false, // determines
            authenticated:true,
        })
    }
    } else {
        if(/^\/$/.test(req.path) && req.path.length===1){
        res.render('index',{
            navlinks:Object.keys(navigation['common']).filter(str => !/(Games|Events|Players)/g.test(str) && navigation['common'][str]['open']),
            dirspace:false, // determines
            authenticated:false,
        })
    }
    }
})
// create a game or an event
app.route('/:type/rec/create').get((req,res)=>{
    const {type} = req.params;
    try{
        if(/^(game|event|player)$/ig.test(type)){
            res.render('create',{
            navlinks:Object.keys(navigation['common']).filter(str => !/(Login|Signup)/g.test(str) && !(new RegExp(type,'i').test(str)) && navigation['common'][str]['open']),
            dirspace:false, // determines
            authenticated:true,
            create:{type:type}
        })
        } else {
            res.status(404).send("Path does not exist.<br>Go <a href='/'>Home</a>")
        }
    }
    catch(err){
        throw new Error(err)
    }
})
app.route('/event/read/:id').get(async(req,res)=>{
    let {id} = req.params;

    try{
        const findById = await findOne(Event,{_id:id});
        console.log(findById)
        // render ejs
        res.render('partials/read_event.ejs',{
            event_data:findById,
            navlinks:Object.keys(navigation['common']).filter(str => !/(Login|Signup)/g.test(str) && navigation['common'][str]['open']),
            dirspace:true, // determines 
            authenticated:false,
            create:false,
        })
    }
    catch(err){
        throw new Error(err)
    }
})
// post - create events
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

    createEvent(payload);
    
    res.redirect('/event/list/all')
})
// post - create game
app.route('/game/create').post((req,res)=>{
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

    createEvent(payload);
    
    res.redirect('/event/list/all')
})

// get - all events/games in json
app.route('/:type/all').get(isAuthenticated, async(req,res)=>{
    
    let {type} = req.params
    try{
        // get list of events from db
        const gameorevent = await findAll(type==='event'?Event:type==='game'?Game : null); // array of events
        res.json({data:gameorevent})
    }
    catch(err){
        throw new Error(err)
    }
})
// events listed by type (all,upcoming,canceled, completed)
app.route('/:type/list/:parameter').get(isAuthenticated,async(req,res)=>{
    const paramStatus = ['all','upcoming','completed','canceled'];
    let {parameter,type} = req.params;
    try{
        // get list of events from db
        const eventorgame = await findAll(type==='event'?Event:type==='game'?Game:null); // array of events
        // console.log(events)
        res.render('events.ejs',{
            type:type,
            navlinks:Object.keys(navigation['common']).filter(str => !/(Login|Signup)/g.test(str) && !(new RegExp(type,'i').test(str)) && navigation['common'][str]['open']),
            event_data:eventorgame, // array of events
            dirspace:true, // determines 
            authenticated:false,
            parameter:!paramStatus.find(p=>new RegExp(p,'ig').test(parameter)) ? undefined : parameter,
            create:true,
        })
    }
    catch(err){
        throw new Error(err)
    }
})

// get - read directory from png or gif
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

/*------------------------------------------- */




app.listen((port),()=>{
    console.log('listening on port: ' + port)
})

app.use(pageNotFound)


// check if authenticated
function isAuthenticated(req,res,next){
    
    // method
    // if(req.authenticated){
    // if(req.authenticated!==undefined && req.authenticated !== false){
    if(1+1===2){
        console.log("auth status:")
        console.log(req.authenticated)
        next();
    } else {
        unauthoized(req,res)
    }
}
// check if NOT authenticated
function isNotAuthenticated(req,res,next){
    // method
    if(!req.authenticated){
        console.log("auth status:")
        console.log(req.authenticated)
        next();
    } else {
        // redirect user back to home
        res.redirect('/')
    }
}
// page not found
function pageNotFound(req,res){
    res.status(404).send('Page not found')
}
// unauthorized
function unauthoized(req,res){
    res.status(403).send('Forbidden')
}