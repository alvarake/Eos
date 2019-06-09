import Button from '@enact/moonstone/Button';
import { Header, Panel } from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Spinner from '@enact/moonstone/Spinner';
import Scroller from '@enact/ui/Scroller';

import BusArrival from '../components/BusArrivals/BusArrival';
import { pauseMedia } from '../actions/MusicActions';


const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		bus: PropTypes.object,
		music: PropTypes.object,
		onClick: PropTypes.func,
		title: PropTypes.string,
	},

	handlers: {
		pause: (ev, { music }) => pauseMedia(music.mediaid),
	},

	// eslint-disable-next-line
	render: ({ title, onClick, bus, music, pause,  ...rest }) => {
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
				{((music.mediaid) ? <Button onClick={pause}>DESPIERTO</Button> : <h1>Tienes que configurar una alarma.</h1>)}	
				<Scroller>
					{((bus.stopid) ? cargandoAutobuses() : <h1>Tienes que configurar una parada de bus.</h1>)}
				</Scroller>
			</Panel>
		);
	},
});

export default MainPanel;

