import axios from 'axios';

import { userTypes } from '../constants';

// --- Requests for GET Routes ---

export const getUserProfile = () => dispatch => {
	dispatch(loading());
	axios
		.get('/api/users/me')
		.then(res => dispatch({ type: userTypes.GET_USER_PROFILE, payload: res.data }))
		.catch(err => console.log(err));
};

// --- Other Actions ---

export const clearCurrentProfile = () => ({
	type: userTypes.CLEAR_CURRENT_PROFILE
});

export const loading = () => ({
	type: userTypes.USER_LOADING
});
