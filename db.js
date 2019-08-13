// Import dotenv module, calling its config method
require('dotenv').config();

const pgp = require('pg-promise')();

const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

console.log(db); 