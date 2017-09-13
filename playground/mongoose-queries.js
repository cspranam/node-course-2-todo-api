const{ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todos');
const {User} = require('./../server/models/Users');

var id = '59b849ff6bea0a3ae8c7335c11';
var userId = '59b7f672f7bb5c3aa81bf61b';

// if(!ObjectId.isValid(id)){
	// console.log('id not valid');
// } else {
	// Todo.find({
		// _id:id
	// }).then((todos)=>{
		// console.log(todos);
	// },(err)=>{
		// console.log(err);
	// });

	// Todo.findOne({
		// _id:id
	// }).then((todo)=>{
		// console.log(todo);
	// },(err)=>{
		// console.log(err);
	// });

	// Todo.findById(id).then((todo)=>{
		// console.log(todo);
	// },(err)=>{
		// console.log(err);
	// }).catch((e) => {
		// console.log(e);
	// });
// }
User.findById(userId).then((user) => {
	if(user){
		console.log('User id found', user.email);
	} else {
		return console.log('User id not found');
	}
}, (err) => {
	console.log('User not found');
}).catch((e)=>{
	console.log(e);
});


