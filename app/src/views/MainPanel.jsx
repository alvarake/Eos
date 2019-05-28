import Button from '@enact/moonstone/Button';
import { Header, Panel } from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import { timeToArrive } from '../actions/BusActions';

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		next: PropTypes.string,
		onClick: PropTypes.func,
		title: PropTypes.string,
	},

	handlers: {
		tiempoBus: (ev, { bus }) => {
			console.log(bus);
			timeToArrive(bus);
		},
	},

	// eslint-disable-next-line
	render: ({ tiempoBus, title, onClick,  ...rest }) => {
		delete rest.next;
		return (
			<Panel {...rest}>
				<Header title={title} titleBelow="Pantalla Principal">
					<Button onClick={onClick}>Configuración</Button>
				</Header>

				<Button onClick={tiempoBus}>TiempoBUS</Button>
			</Panel>
		);
	},
});

export default MainPanel;
