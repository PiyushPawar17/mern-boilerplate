const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	googleID: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	}
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
