// const http = require('http');
const express = require('express');
const Todo = require('./models/Todo');
const User = require('./models/User');

// Create the server and call it app
const app = express();
const port = 3000;


// Tells express to handle GET requests with this function at the route '/'
app.get('/todos', (req, res) => {
    // debugger;
    // const server = http.createServer( (req, res) => {
    console.log(`You've got a new request!`);
    const allTodos = Todo.getAll();
    allTodos
        .then(data => {
            console.log('\n======================================\n')
            console.log(data);
            res.json(data);
            // res.end(JSON.stringify(data));
        })
});

app.get('/todos/:taskID', (req, res) => {
    const oneTodo = Todo.getOne(parseInt(req.params.taskID, 10));
    oneTodo    
        .then(data => {
            console.log('\n======================================\n')
            console.log(data);
            res.send(data);
        })
});

app.get('/users', (req, res) => {
    const allUsers = User.getAll();
    allUsers.then( data => {
        res.json(data);
    })
})

app.get('/users/:id', (req, res) => {
    const oneUser = User.getOne(parseInt(req.params.id, 10));
    oneUser.then( data => {
        res.json(data);
    })
})

// server.listen(3000);
app.listen(port, () => console.log(`App listening on port: ${port}`));