const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';
bcrypt.genSalt(10, (err, salt)=> {
	bcrypt.hash(password, salt, (err, hash) => {
		console.log(hash);
	});
});

var hashedPassword = '$2a$10$wsq99AKzjhKc4rO3ZMS56uhMdiynk7EFd46ZqyxLz9z7HURQmElYO';

bcrypt.compare(password,hashedPassword, (err, res) => {
	console.log(res);
});

// var data = {
	// id: 10
// };
// var token = jwt.sign(data,'saltsecret');
// console.log(`Token is ${token}`);

// var decodedToken = jwt.verify(token,'saltsecret');
// console.log('Decoded Token is ' ,decodedToken);

// var message = 'I am pranam';
// var hash = SHA256(message).toString();
// console.log(`${message} looks like ${hash} after hashing`);

// var data = {
	// id:4
// };
// var token = {
	// data,
	// hash:SHA256(JSON.stringify(data) + 'some salt').toString()
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data) + 'guess the salt').toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'some salt').toString();

// if(resultHash === token.hash) {
	// console.log('Data was not changed');
// } else {
	// console.log('Data was changed. DO NOT Trust');
// }