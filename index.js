const http = require('http');
const Todo = require('./models/Todo');

const server = http.createServer( (req, res) => {
    console.log(`You've got a new request!`);
    const allTodos = Todo.getAll();
    allTodos
        .then(data => {
            console.log('\n======================================')
            console.log(data);
            res.end(`<h1> ${JSON.stringify(data)} </h1>`);
        })

});
// console.log(server);
server.listen(3000);