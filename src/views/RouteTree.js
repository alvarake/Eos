import React from 'react';

const tree = `    Welcome
    |	\\
Settings-Home
	  |
	Fourth

`;

const RouteTree = () => (
	<div>
		<h1>Route Tree</h1>
		<pre>{tree}</pre>
	</div>
);

export default RouteTree;
