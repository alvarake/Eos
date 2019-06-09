import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';


const BusArrival = kind({
	name: 'BusStops',

	propTypes: {
		bus: PropTypes.object,
	},

	// eslint-disable-next-line object-curly-newline
	render: ({ bus, ...rest }) => {
		const arrayLineas = bus.stopsInfo ? bus.stopsInfo.dataLine : [];
		const stopsElement = (
			<div>
				Las líneas de la parada {bus.stopsInfo.stop} son:
				{arrayLineas.map((linea) => {
					if (bus.stopsInfo) {
						const infoPardas = <p>{linea.label}: [{linea.headerA}  =&gt; {linea.headerB}]</p>;
						return (infoPardas);
					}
					return null;
				})}
			</div>
		);
		// eslint-disable-next-line no-param-reassign
		return (
			<div {...rest}>
				{bus.stopsInfo ? stopsElement : null}
			</div>
		);
	},
});

export default BusArrival;
