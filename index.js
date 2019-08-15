// const http = require('http');
const express = require('express');
const Todo = require('./models/Todo');
const User = require('./models/User');

// Create the server and call it app
const app = express();
const port = 3000;

// Use the urlencoded middleware to read POST bodies
app.use(express.urlencoded({extended: true}));

// app.use( (req, res, next) => {
//     console.log('I am middleware');
//     console.log(req.url);

//     next();
// })

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

app.get('/users', async (req, res) => {
    const allUsers = await User.getAll();
    res.json(allUsers);
})

app.get('/users/:id', async (req, res) => {
    const oneUser = await User.getOne(req.params.id);
    res.json(oneUser);
})

app.post('/users', async (req, res) => {
    console.log('Got a post request');
    const newUserInfo = await User.createUser(req.body);
    res.json(newUserInfo.id);
})

app.post('/users/:userId/todos', async (req, res) => {
    const newTask = await User.addTodos(req);
    res.json(newTask);
})

// server.listen(3000);
app.listen(port, () => console.log(`App listening on port: ${port}`));