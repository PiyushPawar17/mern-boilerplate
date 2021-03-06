import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from '../store';

import { getUser } from '../actions/userActions';

import NotFound from './NotFound';

import '../sass/main.scss';

function App() {
	useEffect(() => {
		store.dispatch(getUser());
	}, []);

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

export default App;
