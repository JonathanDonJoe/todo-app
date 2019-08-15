// Use db.one if it expects only one, so it handles errors for results != 1.  Else, use db any.

const db = require('../db');

async function getAll() {
    try{
        return await db.any( `SELECT * from todos`)
    } catch {
        console.log('Error Found:');
        return [];  
    }
}


async function getOne(id) {
    try {
        const aTodo = await db.one( `SELECT * from todos where id=$1`, [id]);
        return aTodo;
    } catch {
        console.log('Error Found:');
        return [];
    }
}

module.exports = {getOne, getAll};
// Above is the same as below.  Called enhanced object literal syntax
// module.exports = {getOne:getOne, getAll:getAll};

// getAll().then(e => console.log(e));

// console.log(db)