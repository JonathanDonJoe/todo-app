// const http = require('http');
const express = require('express');
const Todo = require('./models/Todo');
const User = require('./models/User');
const {sanitizeBody} = require('express-validator');
const es6Renderer = require('express-es6-template-engine');

// Create the server and call it app
const app = express();
const port = 3000;
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');
app.use(express.static('public'));

// Use the urlencoded middleware to read POST bodies
app.use(express.urlencoded({extended: true}));

app.get('/' , (req, res) => {
    res.render('index', { // Assumes it's .html
        locals: {
            message: 'You can track your to-dos here'
        },
        partials: {
            navbar: 'navbar',
            extra: 'extra'
        }
    }); 
});

app.get('/profile/', (req, res) => {
    res.render('profile', {
        locals: {
            
        },
        partials: {
            navbar: 'navbar',
            extra: 'extra'
        }
    });
});

app.get('/profile/todos', async (req, res) => {
    const user_id = 1   // HARDCODED
    const theUser = await User.getOne(user_id)

    res.render('todos', {
        locals: {
            todos: theUser.todos
        },
        partials: {
            navbar: 'navbar',
            extra: 'extra'
        }
    });
});

// 1. Allow the user to GET the form for creating a todo
app.get('/profile/todos/create', (req, res) => {
    // Render the 'Create new todo' form template
    res.render('create-todo', {
        locals: {
            
        },
        partials: {
            navbar: 'navbar',
            extra: 'extra'
        }
    })
});

// 2. Process the body of the form they POST
app.post('/profile/todos/create', [
    sanitizeBody('task').escape()
    ], async (req, res) => {
        // Handle the req.body from the 'Create new todo' form
        console.log(req.body);
        // req.body.priority = '1';
        // console.log(req.body.userId)
        const taskId = await User.addTodos(req.body, req.body.user_id);
        // res.send(taskId);
        res.redirect('/profile/todos');
});

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
        });
});

app.get('/todos/:taskID', (req, res) => {
    const oneTodo = Todo.getOne(parseInt(req.params.taskID, 10));
    oneTodo    
        .then(data => {
            console.log('\n======================================\n')
            console.log(data);
            res.send(data);
        });
});

app.get('/users', async (req, res) => {
    const allUsers = await User.getAll();
    res.json(allUsers);
});

app.get('/users/:id', async (req, res) => {
    const oneUser = await User.getOne(req.params.id);
    res.json(oneUser);
});

app.post('/users', [
    sanitizeBody('username').escape(),
    sanitizeBody('displayname').escape()
    ], async (req, res) => {
        console.log('Got a post request');
        const newUserInfo = await User.createUser(req.body);
        // res.json(newUserInfo.id);
        res.redirect(`/users/`);
});

app.post('/users/:userId/todos', [
    sanitizeBody('username').escape(),
    sanitizeBody('displayname').escape()
    ],async (req, res) => {
        await User.addTodos(req.body, req.params.userId);
        // res.json(newTask);
        res.redirect(`/users/${req.params.userId}`);
});

// server.listen(3000);
app.listen(port, () => console.log(`App listening on port: ${port}`));