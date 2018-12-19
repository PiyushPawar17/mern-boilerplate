const Validator = require('validator');
const isEmpty = require('./isEmpty');

const userRegistrationValidation = ({ name, email, password }) => {
	const error = {};

	if (Validator.isEmpty(name, { ignore_whitespace: true })) {
		error.name = 'No name specified';
	}

	if (!Validator.isEmail(email.trim())) {
		error.email = 'Invalid email';
	}

	if (Validator.isEmpty(email, { ignore_whitespace: true })) {
		error.email = 'No email specified';
	}

	if (Validator.isEmpty(password, { ignore_whitespace: true })) {
		error.password = 'No password specified';
	}

	return {
		error,
		valid: isEmpty(error)
	};
};

const userLoginValidation = ({ email, password }) => {
	const error = {};

	if (!Validator.isEmail(email.trim())) {
		error.email = 'Invalid email';
	}

	if (Validator.isEmpty(email, { ignore_whitespace: true })) {
		error.email = 'No email specified';
	}

	if (Validator.isEmpty(password, { ignore_whitespace: true })) {
		error.password = 'No password specified';
	}

	return {
		error,
		valid: isEmpty(error)
	};
};

module.exports = { userRegistrationValidation, userLoginValidation };
