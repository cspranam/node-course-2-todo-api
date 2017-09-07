//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
	if(err) {
		return console.log('Unable to connect to the Mongo DB Server');
	} 
	console.log('Connected to Mongo DB Server');
	
	// db.collection('Todos').find({_id:new ObjectID('59b11352b70fccf9fa32f41b')}).toArray().then((docs) => {
		// console.log('Todos');
		// console.log(JSON.stringify(docs,undefined,2));
	// }, (err) => {
		// console.log('Unable to fetch todos',err);
	// });
	
	// db.collection('Todos').find().count().then((count) => {
		// console.log('Todos count:'+count);
	// }, (err) => {
		// console.log('Unable to fetch todos',err);
	// });
	
	db.collection('Users').find({name:'Codur'}).toArray().then((docs) => {
		console.log('Users with the name Codur '+JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('Unable to fetch Users',err);
	});
	
	//db.close();
});