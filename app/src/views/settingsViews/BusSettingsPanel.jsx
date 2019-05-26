import Button from '@enact/moonstone/Button';
import Input from '@enact/moonstone/Input';
import { Header, Panel } from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

const BusSettingsPanel = kind({
	name: 'BusSettingsPanel',

	propTypes: {
		onClick: PropTypes.func,
		onSettings: PropTypes.func,
		title: PropTypes.string,
	},

	handlers: {
		loadStopInfo: (ev, { onSettings }) => {
			console.log(ev.value);
			onSettings(ev.value);
		},

	},

	// eslint-disable-next-line
	render: ({ title, onClick, loadStopInfo, ...rest }) => {
		delete rest.next;
		return (
			<Panel {...rest}>
				<Header title={title} titleBelow="Configuración de la parada de bus">
					<Button onClick={onClick}>Configuración</Button>
				</Header>
				Introduce el numero de parada de autobus sobre el que quieres información
				<Input placeholder="Enter STOP id" onChange={loadStopInfo} />
			</Panel>
		);
	},
});

export default BusSettingsPanel;
