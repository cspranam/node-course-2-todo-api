var {User} = require('./../models/Users.js');
var authenticate = (req, resp, next) => {
	var token = req.header('x-auth');
	User.findByToken(token).then((user) => {
		if(!user){
			return Promise.reject('User not found');
		} else {
			req.user = user;
			req.token = token;
			next();
		}
	}).catch((e) => {
		resp.status(401).send(e);
	});
}
module.exports = {authenticate};