//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
	if(err) {
		return console.log('Unable to connect to the Mongo DB Server');
	} 
	console.log('Connected to Mongo DB Server');
	
	// db.collection('Todos').findOneAndUpdate({
		// _id:new ObjectID('59b12c6db70fccf9fa32f885')
	// }, {
		// $set:{
			// completed:true
		// }
	// }, {
		// returnOriginal:false
	// }).then((result) => {
		// console.log(result);
	// });
	
	db.collection('Users').findOneAndUpdate({
		name:'Codur'
	}, {
		$set:{
			name:'Pranam'
		},
		$inc: { 
			age: 1 
		}
	}, {
		
		returnOriginal:false
	}).then((result) => {
		console.log(result);
	});
	
	
	//db.close();
});