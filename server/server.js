var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/Mongoose.js');
var {Todo} = require('./models/Todos.js');
var {User} = require('./models/Users.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
	console.log(req.body);
	var todo = new Todo({
		text:req.body.text
	});
	todo.save().then((doc) => {
		res.status(201).send(doc);
	}, (err) => {
		res.status(400).send(err);
	});
});

app.get('/todos', (req,res) => {
	Todo.find().then((todos)=>{
		res.status(200).send({todos});
	}, (err)=>{
		res.status(400).send(err);
	});
});

app.listen(3000, ()=> {
	console.log('Started on port 3000');
})



