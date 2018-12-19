import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';
import { authTypes } from '../constants';

// --- Requests for POST Routes ---

export const signUp = (user, history) => dispatch => {
	dispatch(loading());
	axios
		.post('/api/users/register', user)
		.then(res => {
			dispatch({ type: authTypes.SIGN_UP, payload: res.data });
			const newUser = {
				email: user.email,
				password: user.password
			};
			dispatch(logIn(newUser));
			history.push('/');
		})
		.catch(err => console.log(err));
};

export const logIn = user => dispatch => {
	dispatch(loading());
	axios
		.post('/api/users/login', user)
		.then(res => {
			// Save / Set token to local storage
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			// Set auth header
			setAuthToken(token);
			// Decode token to get data
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
			dispatch({ type: authTypes.LOG_IN });
			window.location.href = '/';
		})
		.catch(err => console.log(err));
};

// -- Other Actions ---

export const logOut = () => dispatch => {
	dispatch({ type: authTypes.LOG_OUT });
	// Remove token from local storage
	localStorage.removeItem('jwtToken');
	// Remove auth header
	setAuthToken(false);
	// Set current user to {}
	dispatch(setCurrentUser({}));
	window.location.href = '/';
};

export const setCurrentUser = decoded => ({
	type: authTypes.SET_CURRENT_USER,
	payload: decoded
});

export const loading = () => ({
	type: authTypes.AUTH_LOADING
});
