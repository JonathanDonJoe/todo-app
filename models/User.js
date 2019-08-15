const db = require('../db');


async function getAll() {
    const users = await db.any(`SELECT * FROM users`);
    // const todosForUsers = await db.any(`SELECT * FROM todos WHERE`);
    // const test = [];
    const newArray = users.map( async user => {
        // console.log(user.id);
        const userTodos = await db.any(`SELECT * FROM todos WHERE user_id = $1`, [user.id])
        user.todos = userTodos
        // console.log(user);  
        return user;
    })
    
    // console.log('array')
    // console.log(newArray)
    const arrayOfUsersWithTodos = await Promise.all(newArray);
    // console.log(arrayOfUsersWithTodos);
    return arrayOfUsersWithTodos;
}

async function getOne(id) {
    try {
        const user = await db.one(`
            SELECT * FROM USERS
                WHERE id = $1
            `, [id]);
        const todosForUser = await db.any(`
            SELECT * FROM todos WHERE id = $1
            `, [id]);

        user.todos = todosForUser;
        return user;
    } catch (error) {
        console.log('There was an error retreiving user!');
        return {};
        
    }
}

// Accept an object argument so we have flexibility later:
// We can add more database columns without having to update all function calls

// Destructuring:
// async function CreateUser(userDataObj) {
//     const {displayname, username} = userDataObj
async function CreateUser({displayname, username}) {
    const newUserInfo = await db.one(`
        INSERT INTO USERS
            (displayname, username)
        VALUES ($1,$2)
        RETURNING id

        `, [displayname, username]);

        console.log(newUserInfo);
        return newUserInfo;
}

// CreateUser({displayname: 'yes', username: 'no'})

module.exports = {
    getAll,
    getOne
};