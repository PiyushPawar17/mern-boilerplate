import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import store from '../store';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser, logOut } from '../actions/authActions';
import { getUserProfile, clearCurrentProfile } from '../actions/userActions';

import NotFound from './NotFound';

import '../sass/main.scss';

// Check for token in local storage
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set current user
	store.dispatch(setCurrentUser(decoded));
	// Get User Data
	store.dispatch(getUserProfile());
	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logOut());
		// Clear user profile
		store.dispatch(clearCurrentProfile());
		// Redirect to homepage
		window.location.href = '/';
	}
}

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<Switch>
							<Route component={NotFound} />
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
