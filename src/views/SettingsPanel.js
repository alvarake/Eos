import Button from '@enact/moonstone/Button';
import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import RouteTree from './RouteTree';

const SettingsPanel = kind({
	name: 'SettingsPanel',

	propTypes: {
		next: PropTypes.string,
		onClick: PropTypes.func,
		title: PropTypes.string
	},

	computed: {
		text: ({next}) => `To ${next} Panel`
	},

	render: ({title, onClick, text, ...rest}) => {
		delete rest.next;
		return (
			<Panel {...rest}>
				<Header title={title} ><Button onClick={onClick}>Home</Button></Header>
				<RouteTree />
			</Panel>
		);
	}
});

export default SettingsPanel;
