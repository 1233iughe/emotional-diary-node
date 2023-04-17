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
const fs = require('fs')
const database = require('./route_modules/database');
const DB_PATH = `${__dirname}/database/`;
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
        //Setting listening port
        app.listen(PORT, () => console.log(`app available on local on http://localhost:${PORT}`));
        return app;
    } catch(e) {
        console.log(e);
    } 
}

app = appInit();


//Callback functions take a request and a response
//*Setting the root route of the app
const filePath = path.join(__dirname, 'index.html');

app.get('/', (request,response) => {
    fs.readFile(filePath, 'utf8', (err,html) => {
        if (err) {
            response.status(500).send('sorry we fucked up')
        }
        response.send(html)
    })
})


