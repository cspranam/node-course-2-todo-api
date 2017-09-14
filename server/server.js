var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/Mongoose.js');
var {Todo} = require('./models/Todos.js');
var {User} = require('./models/Users.js');

var app = express();
const port = process.env.port || 3000;

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

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;
	if(ObjectID.isValid(id)){
		Todo.findById(id).then((todo)=>{
			if(todo) {
				res.status(200).send({todo});
			} else {
				res.status(404).send('Id not found');
			}
		},(err)=>{
			res.status(400).send();
		});
	} else {
		res.status(400).send('Id is invalid');
	}
});

app.listen(port, ()=> {
	console.log(`Started on port ${port}`);
})



