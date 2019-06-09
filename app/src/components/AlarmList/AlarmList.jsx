import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '@enact/moonstone/Button';

const BusArrival = kind({
	name: 'AlarmList',

	propTypes: {
		alarm: PropTypes.object,
		onDelete: PropTypes.func,
	},

	// eslint-disable-next-line object-curly-newline
	render: ({ alarm, onDelete, ...rest }) => {
		const listadeAlarmas = alarm.alarms.map(alarma => (
			<li>
				{alarma}
				<Button onClick={() => onDelete(alarma)}>Borrar</Button>
			</li>
		));
		// eslint-disable-next-line no-param-reassign
		return (
			<div {...rest}>
				<h1>{(alarm.alarms[0]) ? 'Las alarmas configuradas son: ' : 'No hay ninguna alarma configurada.'}</h1>
				<ul>{ alarm.alarms ? listadeAlarmas : ''}
				</ul>
			</div>
		);
	},
});

export default BusArrival;
