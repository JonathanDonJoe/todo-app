// const http = require('http');
const express = require('express');
const Todo = require('./models/Todo');

// Create the server and call it app
const app = express();
const port = 3000;


// Tells express to handle GET requests with this function at the route '/'
app.get('/todos', (req, res) => {
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

// server.listen(3000);
app.listen(port, () => console.log(`App listening on port: ${port}`));