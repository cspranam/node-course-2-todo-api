//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
	if(err) {
		return console.log('Unable to connect to the Mongo DB Server');
	} 
	console.log('Connected to Mongo DB Server');
	// db.collection('Todos').insertOne({
		// text:'Something to do',
		// completed:false
	// }, (err, result)=> {
		// if(err){
			// return console.log('Unable to insert Todo ', err);
		// }
		// console.log(JSON.stringify(result.ops,undefined,2));
	// });
	
	// db.collection('Users').insertOne({
		// name:'Pranam',
		// age:'35',
		// location:'UK'
	// }, (err, result) => {
		// if(err){
			// return console.log('Unable to insert into Users', err);
		// }
		// console.log('Hurray. Inserted data into Users collection');
		// console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
	// });
	
	db.close();
});