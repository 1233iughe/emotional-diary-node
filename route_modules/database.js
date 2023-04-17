const sqlite3 = require('sqlite3');
const DB_PATH = `${__dirname}/database/`;
process.env.DB_PATH = DB_PATH;

//Data base creation and connection
function dbInit() {
    try {
        fs.access(DB_PATH, function(error) {
            if (error) {
                console.log('Database not found');
                console.log('Creating database...');

                //Creating directory
                fs.mkdir(DB_PATH, (err) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        //Database creation
                        const db = new sqlite3.Database(DB_PATH + 'database.db');

                        //Database population
                        fs.readFile('schema.sql','utf-8', (error, blueprint) => {
                            if (error) {
                                console.log(error.message);
                            } else {
                                db.exec(blueprint, (error) => {
                                    if (error) {
                                        console.log(error.message);
                                    } else {
                                        console.log('Database created\nConnection stablished');
                                        return db;
                                    }
                                });
                            }
                        });
                    }
                });
                
            } else {
                console.log('Stablishing database connection...');
                //Database creation
                const db = new sqlite3.Database(DB_PATH + 'database.db');
                console.log('Connection stablished');
                return db;
            }
        });
    } catch(e) {
        console.log(e);
    }
}

module.exports = database;