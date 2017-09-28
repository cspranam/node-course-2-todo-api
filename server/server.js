var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var _  = require('lodash');

var {mongoose} = require('./db/Mongoose.js');
var {Todo} = require('./models/Todos.js');
var {User} = require('./models/Users.js');

var app = express();
const port = process.env.PORT || 3000;

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

app.post('/users', (req,res) =>{
	var body = _.pick(req.body, ['email','password']);
	var user = new User(body);
	user.save().then(() => {
		return user.generateAuthToken();
		//res.status(201).send(user);
	}).then((token)=>{
		res.status(201).header('x-auth',token).send(user);
	}).catch((err) => {
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

app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text','completed']);
	if (ObjectID.isValid(id)){
		if(_.isBoolean(body.completed) && body.completed){
			body.completedAt = new Date().getTime();
		} else {
			body.completed = false;
			body.completedAt = null;
		}
		Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
			if(todo){
				res.status(200).send({todo})
			} else{
				res.status(404).send('Todo not found');
			}
		},(err)=>{
			res.status(404).send('id not found');
		}).catch((err) => {
			res.status(404).send(err);
		});
	} else {
		res.status(404).send('id is invalid');
	}
});


app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;
	if (ObjectID.isValid(id)){
		Todo.findByIdAndRemove(id).then((todo)=>{
			if(todo){
				res.status(200).send({todo});
			} else {
				res.status(404).send('id not found');
			}
		},(err)=>{
			res.status(400).send('Error. Please contact administrator');
		}).catch((e) => {
			res.status(400).send(err);
		});
	} else {
		res.status(404).send('id is invalid');
	}
});

app.listen(port, ()=> {
	console.log(`Started on port ${port}`);
})



