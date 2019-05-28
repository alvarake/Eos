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

	// eslint-disable-next-line
	render: ({ title, onClick, onSettings, ...rest }) => {
		delete rest.next;
		return (
			<Panel {...rest}>
				<Header title={title} titleBelow="Configurando la parada de bus.">
					<Button onClick={onClick}>Atras</Button>
				</Header>
				Introduce el número de la parada del autobús sobre el que quieres información.
				<Input placeholder="IDde la parada del bus" onChange={onSettings} />
			</Panel>
		);
	},
});

export default BusSettingsPanel;
