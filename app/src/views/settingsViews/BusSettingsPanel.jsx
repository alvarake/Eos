import Button from '@enact/moonstone/Button';
import Input from '@enact/moonstone/Input';
import { Header, Panel } from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Spinner from '@enact/moonstone/Spinner';
import Divider from '@enact/moonstone/Divider';
import BusStops from '../../components/BusStops/BusStops';

const BusSettingsPanel = kind({
	name: 'BusSettingsPanel',

	propTypes: {
		bus: PropTypes.object,
		onClick: PropTypes.func,
		onSettings: PropTypes.func,
		onRequest: PropTypes.func,
		title: PropTypes.string,
	},

	// eslint-disable-next-line
	render: ({ bus, title, onClick, onRequest, onSettings, ...rest }) => {
		delete rest.next;

		const loanding = (<Spinner>Cargando...</Spinner>);
		const busLines = (<BusStops bus={bus} />);
		const cargandoAutobuses = () => {
			if (bus.stopid) {
				if (!bus.stopsInfo) {
					return loanding;
				}
				return busLines;
			}
			return (<h1>Tienes que configurar una parada de autobus.</h1>);
		};


		return (
			<Panel {...rest}>

				<Header title={title} titleBelow="Configurando la parada de bus.">
					<Button onClick={onClick}>Atras</Button>
				</Header>

				<Input placeholder="ID de la parada del bus" onChange={onSettings} />
				<Button onClick={onRequest}>Guardar</Button>

				<Divider casing="preserve" spacing="medium">
					{cargandoAutobuses()}
				</Divider>
			</Panel>
		);
	},
});

export default BusSettingsPanel;