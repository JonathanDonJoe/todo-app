// Use db.one if it expects only one, so it handles errors for results != 1.  Else, use db any.

const db = require('../db');

function getAll() {
    return db.any( `SELECT * from todos`)   
    // .then( (data) => {
    //     console.log('Here is the data: ');
    //     console.log(data);
        
    // })
    .catch( (err) => {
        console.log('Error Found:');
        console.log(err);
        
    })
}


function getOne(id) {
    return db.one( `SELECT * from todos where id=$1`, [id])   
        // .then( (data) => {
        //     console.log('Here is the data: ');
        //     console.log(data);
            
        // })
        .catch( (err) => {
            console.log('Error Found:');
            console.log(err);   
        })
}

module.exports = {getOne, getAll};
// Above is the same as below.  Called enhanced object literal syntax
// module.exports = {getOne:getOne, getAll:getAll};

// getAll().then(e => console.log(e));

// console.log(db)