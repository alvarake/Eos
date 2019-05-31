import Button from '@enact/moonstone/Button';
import { Header, Panel } from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Spinner from '@enact/moonstone/Spinner';
import Scroller from '@enact/ui/Scroller';

import BusArrival from '../components/BusArrivals/BusArrival';


const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		bus: PropTypes.object,
		onClick: PropTypes.func,
		title: PropTypes.string,
	},

	// eslint-disable-next-line
	render: ({ title, onClick, bus,  ...rest }) => {
		const cargandoAutobuses = () => {
			if (!bus.arrivals) {
				return (<Spinner>Cargando...</Spinner>);
			}
			return (<BusArrival bus={bus} />);
		};

		delete rest.next;
		return (
			<Panel {...rest}>
				<Header title={title} titleBelow="Pantalla Principal">
					<Button onClick={onClick}>Configuración</Button>
				</Header>
				<Scroller>
					{((bus.stopid) ? cargandoAutobuses() : <h1>Tienes que configurar una parada de bus.</h1>)}
				</Scroller>
			</Panel>
		);
	},
});

export default MainPanel;

