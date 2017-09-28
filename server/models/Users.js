const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = mongoose.Schema({
	email:{
		type: String,
		require: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
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

var User = mongoose.model('Users', UserSchema);

module.exports = {User};