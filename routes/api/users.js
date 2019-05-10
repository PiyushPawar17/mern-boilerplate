const router = require('express').Router();
const _ = require('lodash');

const User = require('../../models/User');

// Routes for /api/users

// User data to be returned
const userData = ['_id', 'name', 'email'];

// --- GET Requests ---

// Route -> /api/users/me
// Returns current user
router.get('/me', (req, res) => {
	if (req.user) {
		User.findById(req.user.id)
			.then(currentUser => {
				const user = _.pick(currentUser, userData);
				res.json({ user });
			})
			.catch(console.log);
	} else {
		res.json({ user: null });
	}
});

module.exports = router;
