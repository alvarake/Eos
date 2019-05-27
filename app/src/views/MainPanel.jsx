import Button from '@enact/moonstone/Button';
import { Header, Panel } from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		next: PropTypes.string,
		onClick: PropTypes.func,
		title: PropTypes.string,
	},

	// eslint-disable-next-line
	render: ({ title, onClick, llamadaHelloWorld, subHeartBeat, changeGreeting, ...rest }) => {
		delete rest.next;
		return (
			<Panel {...rest}>
				<Header title={title} titleBelow="Pantalla Principal">
					<Button onClick={onClick}>Configuración</Button>
				</Header>
			</Panel>
		);
	},
});

export default MainPanel;
