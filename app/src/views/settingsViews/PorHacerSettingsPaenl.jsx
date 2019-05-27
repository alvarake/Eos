import Button from '@enact/moonstone/Button';
import Input from '@enact/moonstone/Input';
import { Header, Panel } from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import LS2Request from '@enact/webos/LS2Request';

const MainPanel = kind({
	name: 'PorHacerSettingsPanel',

	propTypes: {
		next: PropTypes.string,
		onClick: PropTypes.func,
		title: PropTypes.string,
	},

	handlers: {
		llamadaHelloWorld: () => new LS2Request().send({
			service: 'luna://eos.helloservice',
			method: 'hello',
			onSuccess: (res) => {
				console.log(res);
			},
			onFailure: (res) => {
				console.log(res);
			},
		}),

		changeGreeting: ev => new LS2Request().send({
			service: 'luna://eos.helloservice',
			method: 'config/setGreeting',
			parameters: { greeting: ev.value },
			onSuccess: (res) => {
				console.log(res);
			},
			onFailure: (res) => {
				console.log(res);
			},
		}),
		subHeartBeat: () => new LS2Request().send({
			service: 'luna://eos.helloservice',
			method: 'heartbeat',
			subscribe: true,
			onSuccess: (res) => {
				console.log(res);
			},
			onFailure: (res) => {
				console.log(res);
			},
		}),

	},


	// eslint-disable-next-line
	render: ({ title, onClick, llamadaHelloWorld, subHeartBeat, changeGreeting, ...rest }) => {
		delete rest.next;
		return (
			<Panel {...rest}>
				<Header title={title} titleBelow="Prueba de llamadas a Servicios">
					<Button onClick={onClick}>Atras</Button>
				</Header>
				<Input placeholder="Enter Greeting here" onChange={changeGreeting} />
				<Button onClick={llamadaHelloWorld}>Gretting</Button>
				<Button onClick={subHeartBeat}>HeartBeat</Button>
			</Panel>
		);
	},
});

export default MainPanel;
