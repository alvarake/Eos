import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';


const BusArrival = kind({
	name: 'BusArrival',

	propTypes: {
		bus: PropTypes.object,
	},

	// eslint-disable-next-line object-curly-newline
	render: ({ bus, ...rest }) => {
		const lineasParada = bus.arrivals ? bus.arrivals.StopLines : [];
		const autobuses = bus.arrivals ? bus.arrivals.Arrive : [];

		const listadeParadas = lineasParada.map(linea => (
			<li>
				<h3>{linea.Description}: {linea.Label}</h3>
				{autobuses.map((autobus) => {
					if (linea.Label === autobus.line) {
						if (autobus.estimateArrive !== 999999) {
							return `/ ${Math.trunc(autobus.estimateArrive / 60)} minutos /`;
						}
						return '/ +20 mins /';
					}
				})}
			</li>
		));

		// eslint-disable-next-line no-param-reassign
		return (
			<div {...rest}>
				<h1>{bus.arrivals ? bus.arrivals.nombreParada : 'Tienes que configurar una parada'}</h1>
				<ul>{bus.arrivals ? listadeParadas : 'Se esta cargando los datos del bus'}</ul>
			</div>
		);
	},
});

export default BusArrival;
