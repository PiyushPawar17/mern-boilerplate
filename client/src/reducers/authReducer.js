import { authTypes } from '../constants';
import isEmpty from '../utils/isEmpty';

const initialState = {
	authenticated: false,
	user: {},
	loading: false,
	message: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case authTypes.SIGN_UP:
			return {
				...state,
				loading: false,
			};
		case authTypes.LOG_IN:
			return {
				...state,
				loading: false,
			};
		case authTypes.LOG_OUT:
			return {
				...state,
				loading: false,
			};
		case authTypes.SET_CURRENT_USER:
			return {
				...state,
				authenticated: !isEmpty(action.payload),
				user: action.payload
			};
		case authTypes.AUTH_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
