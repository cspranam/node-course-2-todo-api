//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
	if(err) {
		return console.log('Unable to connect to the Mongo DB Server');
	} 
	console.log('Connected to Mongo DB Server');
	
	//deleteMany
	// db.collection('Todos').deleteMany({text:'eat lunch'}).then((result)=>{
		// console.log(result);
	// },(err) => {
		// console.log(err);
	// });
	
	//deleteOne
	// db.collection('Todos').deleteOne({text:'eat lunch'}).then((result)=>{
		// console.log(result);
	// },(err) => {
		// console.log(err);
	// });
	
	//findOneAndDelete
	// db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
		// console.log(result);
	// },(err) => {
		// console.log(err);
	// });
	
	// db.collection('Users').deleteMany({name:"Sreedhar"}).then((result) => {
		// console.log(result);
	// });
	
	// db.collection('Users').findOneAndDelete({_id:new ObjectID('59b1301ab70fccf9fa32f9e7')}).then((result) => {
		// console.log(result);
	// });
	
	//db.close();
});