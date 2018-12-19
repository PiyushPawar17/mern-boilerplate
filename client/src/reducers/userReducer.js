import { userTypes } from '../constants';

const initialState = {
	user: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case userTypes.GET_USER_PROFILE:
			return {
				...state,
				user: action.payload.user,
				loading: false
			};
		case userTypes.CLEAR_CURRENT_PROFILE:
			return {
				...state,
				user: {}
			};
		case userTypes.USER_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
