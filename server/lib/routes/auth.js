const express = require('express')
const router = express.Router();
const navigation = {
    common:require("../common/navigation.json"),
    admin:require("../admin/navigation.json")
}
const passport = require('passport')


// const timelog = (req,res,next) => {
//     let current_time = new Date(Date.now()).toString();
//     console.log(current_time)
//     next();
// }
// router.use(timelog)


router.route('/login').get((req,res)=>{
    if(/^\/login$/.test(req.path)){
        res.render('login',{
            navlinks:Object.keys(navigation['common']).filter(str => !/(Events|Games|Login)/g.test(str) && navigation['common'][str]['open']),
            dirspace:false, // determines
            authenticated:false,
            title:'Login',
            admin:false,
        })
    } 
})
router.route('/signup').get((req,res)=>{
    if(/^\/signup$/.test(req.path)){
        res.render('signup',{
            navlinks:Object.keys(navigation['common']).filter(str => !/(Events|Games|Signup)/g.test(str) && navigation['common'][str]['open']),
            dirspace:false, // determines
            authenticated:false,
            title:'Signup',
            admin:false,

        })
    } 
})

router.route('/admin/login').get((req,res)=>{
    if(/^\/admin\/login$/.test(req.path)){
        res.render('login',{
            navlinks:Object.keys(navigation['admin']).filter(str => !/(Events|Games|Signup)/g.test(str) && navigation['admin'][str]['open']),
            dirspace:false, // determines
            authenticated:false,
            title:'Login',
            admin:true,
        })
    } 
})
router.route('/forgot-pw').get((req,res)=>{
    const comingSoon = 'Page coming soon.'
    res.status(200).send(comingSoon)
})

router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


module.exports = router