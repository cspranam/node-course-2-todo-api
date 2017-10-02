const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
	email:{
		type: String,
		require: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			isAsync: false,
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password:{
		type: String,
		require: true,
		minLength: 6
	},
	tokens: [{
		access:{
			type: String,
			require: true
		},
		token: {
			type: String,
			require: true
		}
	}]
});
 
UserSchema.methods.toJSON = function() {
	var user = this;
	var userObj = user.toObject();
	return _.pick(userObj,['_id','email']);
}
UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id:user._id.toHexString(), access},'abc123');
	user.tokens.push({access, token});
	return user.save().then(()=>{
		return token;
	});
};

UserSchema.methods.removeToken = function(token){
	var user = this;
	return user.update({
		$pull:{
			tokens:{
				token: token
			}
		}
	});
}

UserSchema.statics.findByToken = function(token) {
	var User = this;
	var decoded;
	try{
		decoded = jwt.verify(token, 'abc123');
		
	} catch(e) {
		return Promise.reject('Invalid token');
	}
	return User.findOne({
		'_id':decoded._id,
		'tokens.token':token,
		'tokens.access':'auth'
	});
}

UserSchema.statics.findByCredentials = function(email, password) {
	var User = this;
	return User.findOne({email}).then((user) => {
		if(!user){
			return Promise.reject();
		} else {
			return new Promise((resolve, reject) => {
				bcrypt.compare(password,user.password, (err, res) => {
					if(res){
						console.log('Found a user');
						console.log(user.email);
						resolve(user);
					} else {
						reject();
					}
				});
			});
		}
	});
}


UserSchema.pre('save', function(next){
	var user = this;
	if(user.isModified('password')){
		bcrypt.genSalt(10, (err, salt)=> {
			bcrypt.hash(user.password, salt, (err, hash) => {
			user.password = hash;
			next();
		});
	});} else {
		next();
	}
});

var User = mongoose.model('Users', UserSchema);

module.exports = {User};