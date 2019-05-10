import axios from 'axios';

import { userTypes } from '../constants';

// --- Requests for GET Routes ---

export const getUser = () => dispatch => {
	axios
		.get('/api/users/me')
		.then(res => {
			dispatch({ type: userTypes.GET_USER, payload: res.data });
		})
		.catch(console.log);
};
