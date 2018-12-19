const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const User = require('../../models/User');
const { secretOrKey } = require('../../config/keys');
const { userRegistrationValidation, userLoginValidation } = require('../../utils/userValidation');

// Routes for /api/users

// User data to be returned
const userData = ['_id', 'name', 'email'];

// --- GET Requests ---

// Route - /api/users/me
// Returns current user info
router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
	User.findById(req.user._id)
		.then(currentUser => {
			const user = _.pick(currentUser, userData);
			res.json({ user });
		})
		.catch(err => console.log(err));
});

// --- POST Requests ---

// Route - /api/users/register
// Registers a new user
router.post('/register', (req, res) => {
	const { name, email, password } = req.body;
	const { error, valid } = userRegistrationValidation(req.body);

	if (!valid) {
		return res.status(400).json({ error });
	}

	User.findOne({ email }).then(currentUser => {
		if (currentUser) {
			return res.status(400).json({ error: 'Email already exist' });
		} else {
			const newUser = new User({
				name,
				email,
				password
			});

			newUser
				.save()
				.then(newUser => {
					const user = _.pick(newUser, userData);

					res.json({ user });
				})
				.catch(err => console.log(err));
		}
	});
});

// Route - /api/users/login
// Login User / Return Token
router.post('/login', (req, res) => {
	const { email, password } = req.body;
	const { error, valid } = userLoginValidation(req.body);

	if (!valid) {
		return res.status(400).json({ error });
	}

	User.findOne({ email })
		.then(user => {
			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			} else {
				bcrypt.compare(password, user.password).then(isMatch => {
					if (isMatch) {
						const payload = {
							id: user.id,
							name: user.name,
							email: user.email
						};

						jwt.sign(payload, secretOrKey, { expiresIn: 12 * 60 * 60 }, (err, token) => {
							res.json({ token: `Bearer ${token}` });
						});
					} else {
						return res.status(400).json({ error: 'Password Incorrect' });
					}
				});
			}
		})
		.catch(err => console.log(err));
});

module.exports = router;
