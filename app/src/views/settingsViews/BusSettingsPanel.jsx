import Button from '@enact/moonstone/Button';
import Input from '@enact/moonstone/Input';
import { Header, Panel } from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import LS2Request from '@enact/webos/LS2Request';


const BusSettingsPanel = kind({
	name: 'BusSettingsPanel',

	propTypes: {
		onClick: PropTypes.func,
		title: PropTypes.string,
	},

	handlers: {
		loginBus: () => new LS2Request().send({
			service: 'luna://eos.busservice',
			method: 'login',
			onSuccess: (res) => {
				console.log(res);
			},
			onFailure: (res) => {
				console.log(res);
			},
		}),

		loadStopInfo: (ev) => {
			console.log('Entramos en loadStopInfo');
			const stopid = Number(ev.value);
			return new LS2Request().send({
				service: 'luna://eos.busservice',
				method: 'stopdetail',
				parameters: { stopid },
				onSuccess: (res) => {
					console.log(res);
				},
				onFailure: (res) => {
					console.log(res);
				},
			});
		},

	},

	// eslint-disable-next-line
	render: ({ title, onClick, pruebaLS2, loadStopInfo, loginBus, subHeartBeat, changeGreeting, ...rest }) => {
		delete rest.next;
		return (
			<Panel {...rest}>
				<Header title={title} titleBelow="Configuración de la parada de bus">
					<Button onClick={onClick}>Configuración</Button>
				</Header>
				<Button onClick={loginBus}>Token</Button>
				<Input placeholder="Enter STOP id" onChange={loadStopInfo} />
			</Panel>
		);
	},
});

export default BusSettingsPanel;
