// Import dotenv module, calling its config method
require('dotenv').config();

const pgp = require('pg-promise')();

const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

// console.log(db); 


// Use db.one if it expects only one, so it handles errors for results != 1.  Else, use db any.

function getOne(id) {
    db.one( `SELECT * from todos where id=$1`, [id])   
        .then( (data) => {
            console.log('Here is the data: ');
            console.log(data);
            
        }).catch( (err) => {
            console.log('Error Found:');
            console.log(err);
            
        })
}

getOne(32);