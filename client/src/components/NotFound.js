import React from 'react';
import { Ghost } from 'react-kawaii';

const NotFound = props => (
	<div className="not-found">
		<div className="not-found__kawaii">
			<Ghost mood="sad" color="#83d1fb" />
		</div>
		<div className="not-found__text">404 - Not Found</div>
	</div>
);

export default NotFound;
