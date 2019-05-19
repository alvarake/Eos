import Button from '@enact/moonstone/Button';
import Input from '@enact/moonstone/Input';
import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import LS2Request from '@enact/webos/LS2Request';


const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		next: PropTypes.string,
		onClick: PropTypes.func,
		title: PropTypes.string
	},

	handlers:{
		pruebaLS2: (event) => {
			console.log(event);
			return new LS2Request().send({
				service: 'luna://com.webos.service.systemservice',
				method: 'time/getSystemTime',
				onSuccess: (res) => {
					console.log("Has tenido exito en hacer la comunicacion")
					console.log(res)
				},
				onFailure: (res) => {
					console.log("Has fallado en hacer la comunicacion")
					console.log(res)
				},
				timeout: 20000,
				onTimeout: () => {
					console.log("Se agoto el tiempo de espera")
				}
			}
			);
		},

		llamadaHelloWorld: (ev) => {
			console.log(ev);
			return new LS2Request().send({
				service: 'luna://eos.service',
				method: 'hello',
				onSuccess: (res) => {
					console.log("Has tenido exito en hacer la comunicacion")
					console.log(res)
				},
				onFailure: (res) => {
					console.log("Has fallado en hacer la comunicacion")
					console.log(res)
				},
				timeout: 20000,
				onTimeout: () => {
					console.log("Se agoto el tiempo de espera")
				}
			});
		},

		changeGreeting: (ev) => {
			console.log(ev);
			return new LS2Request().send({
				service: 'luna://eos.service',
				method: 'config/setGreeting',
				parameters :{greeting: ev.value},
				onSuccess: (res) => {
					console.log("Has tenido exito en hacer la comunicacion")
					console.log(res)
				},
				onFailure: (res) => {
					console.log("Has fallado en hacer la comunicacion")
					console.log(res)
				},
				timeout: 20000,
				onTimeout: () => {
					console.log("Se agoto el tiempo de espera")
				}
			});
		},

	},

	render: ({title, onClick, pruebaLS2, llamadaHelloWorld, changeGreeting, ...rest}) => {
		delete rest.next;
		return (
			<Panel {...rest}>
				<Header title={title}>
				<Button onClick={onClick}>Configuración</Button>
				</Header>
				Prueba de llamadas a Servicios
				<Input placeholder="Enter Greeting here"  onChange={changeGreeting}/>
				<Button onClick={llamadaHelloWorld}>Gretting</Button>
				<Button onClick={pruebaLS2}>HoraSistema</Button>
			</Panel>
		);
	}
});

export default MainPanel;
