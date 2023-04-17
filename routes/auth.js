const express = require('express');
const hash = require('pbkdf2-password');
const session = require('express-session');
const path = require('path');
const router = express.Router();
const ejs = require('ejs');
const database = require('../config/database.js');
const sqlite3 = require('sqlite3');



//Mini-app
app = express();
app.engine('.html', require('ejs').__express);
app.db = database.dbInit(DB_PATH);


//middleware
app.use(express.urlencoded({ extended: false }))
//*Sets up the cookie containing the id of the session
//*This cookie will be send at every request.
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));



//Defining login page
//TODO: Add user authentication conditional


router.get('/', (req, res) => {
    res.redirect(403,'/auth/login');
});

router.get('/auth/login', (req,res) => {
    res.render('layout.html', 
    {data:{user:false, 
        template:'login.html',
        title:'login'}});

});

module.exports = router;