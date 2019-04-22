import React from 'react';

const tree = ` 
   Welcome
    |	\\
Home       Settings
        //  |     |  \\
      Music Alarm Route etc
`;

const RouteTree = () => (
	<div>
		<h1>Route Tree</h1>
		<pre>{tree}</pre>
	</div>
);

export default RouteTree;
