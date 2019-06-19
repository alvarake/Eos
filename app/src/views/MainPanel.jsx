import Button from '@enact/moonstone/Button';
import { Header, Panel } from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Spinner from '@enact/moonstone/Spinner';
import Scroller from '@enact/ui/Scroller';
import Divider from '@enact/moonstone/Divider';

import AlarmList from '../components/AlarmList/AlarmList';

import BusArrival from '../components/BusArrivals/BusArrival';
import { pauseMedia } from '../actions/MusicActions';


const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		alarm: PropTypes.object,
		bus: PropTypes.object,
		music: PropTypes.object,
		onClick: PropTypes.func,
		onDeleteAlarm: PropTypes.func,
		title: PropTypes.string,
	},

	handlers: {
		pause: (ev, { music }) => pauseMedia(music.mediaid),
	},

	// eslint-disable-next-line
	render: ({ alarm, title, onClick, onDeleteAlarm, bus, music, pause,  ...rest }) => {
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
					{((music.mediaid) ? <Button onClick={pause}>DESPIERTO</Button> : '')}
					<Button onClick={onClick}>Configuración</Button>
				</Header>
				<Divider casing="preserve" spacing="medium">
					{music.mediaid ? <AlarmList alarm={alarm} onDelete={onDeleteAlarm} /> : ''}
				</Divider>
				<Scroller>
					{((music.mediaid) ? '' : <h1>Tienes que configurar una alarma.</h1>)}
					{((bus.stopid) ? cargandoAutobuses() : <h1>Tienes que configurar una parada de bus.</h1>)}
				</Scroller>


			</Panel>
		);
	},
});

export default MainPanel;
