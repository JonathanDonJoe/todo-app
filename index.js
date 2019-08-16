// const http = require('http');
const express = require('express');
const Todo = require('./models/Todo');
const User = require('./models/User');
const {sanitizeBody} = require('express-validator');
const es6Renderer = require('express-es6-template-engine');

// Create the server and call it app
const app = express();
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');
const port = 3000;

app.get('/' , (req, res) => {
    res.render('index', { // Assumes it's .html
        locals: {
            message: 'It is time for lunch'
        },
        partials: {
            navbar: './navbar'
        }
    }) 
})

app.get('/profile/', (req, res) => {
    res.render('profile', {
        locals: {
            
        },
        partials: {
            
        }
    })
})

app.get('/profile/todos', (req, res) => {
    res.render('todos', {
        locals: {
            
        },
        partials: {

        }
    })
})

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

app.post('/users', [
    sanitizeBody('username').escape(),
    sanitizeBody('displayname').escape()
], async (req, res) => {
    console.log('Got a post request');
    const newUserInfo = await User.createUser(req.body);
    // res.json(newUserInfo.id);
    res.redirect(`/users/`)
})

app.post('/users/:userId/todos',async (req, res) => {
    await User.addTodos(req.body, req.params.userId);
    // res.json(newTask);
    res.redirect(`/users/${req.params.userId}`);
})

// server.listen(3000);
app.listen(port, () => console.log(`App listening on port: ${port}`));