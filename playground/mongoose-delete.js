const{ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todos');
const {User} = require('./../server/models/Users');

// Todo.remove({}).then((result)=>{
	// console.log(result);
// });

// Todo.findOneAndRemove().then((todo)=>{
	// console.log(todo);
// });

Todo.findByIdAndRemove('59bbf98b66c02a2aced7aaa4').then((todo)=>{
	console.log(todo);
});