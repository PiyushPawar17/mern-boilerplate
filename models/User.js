const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	}
});

// This runs before saving the user
UserSchema.pre('save', function(next) {
	// user = the current user to be saved
	let user = this;

	// Returns true if password field is modified
	if (user.isModified('password')) {
		// Generates a salt with 10 rounds
		bcrypt.genSalt(10, (err, salt) => {
			// Hashes the password with the salt
			bcrypt.hash(user.password, salt, (err, hash) => {
				if (err) throw err;
				// Sets the password to hashed password
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
