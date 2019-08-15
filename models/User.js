const db = require('../db');


function getAll() {
    return db.any(`SELECT * FROM users`)
        .catch( err => {
            console.log('Error getting users. ');
            console.log(err);            
        })
}

function getOne(id) {
    return db.one(`
        SELECT * FROM USERS
            WHERE id = $1
        `, [id])
    .then( user => {
        const todos = db.any(`
        SELECT * FROM todos WHERE id = $1
        `, [id])
        .then( todosForUser => {
            console.log(todosForUser);
            user.todos = todosForUser;
            return user;
        })
        return todos;
    })

    .catch( err => {
        console.log('Error getting user');
        console.log(err);
    })
}

module.exports = {
    getAll,
    getOne
};