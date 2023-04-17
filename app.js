/**This file contains the code needed to init an app instance,
create or/and connect to the database ,and log the link to access
 the app in browser  .
 *TODO: Complete appInit()

*/

//imports
require('dotenv').config()
const express =  require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const database = require('./config/database');
const DB_PATH = `${__dirname}/database/`;
const router = require('./routes.js');
process.env.DB_PATH = DB_PATH;

//Global variables
//*Defining listening port
const PORT = process.env.PORT || 4000;


//App initialization
function appInit() {
    try {
        //Creating app
        const app = express();
        //Setting/creating connection to database
        app.db = database.dbInit(DB_PATH);
        //Setting view engine so .ejs is not necessary
        app.engine('.html', require('ejs').__express);
        //Setting listening port
        app.listen(PORT, () => console.log(`app available on local on http://localhost:${PORT}`));
        return app;
    } catch(e) {
        console.log(e);
    } 
}

app = appInit();

app.use('/', router.auth);



