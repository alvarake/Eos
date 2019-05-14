import Button from '@enact/moonstone/Button';
import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import LS2Request from '@enact/webos/LS2Request';

const AlarmSettingsPanel = kind({
	name: 'AlarmSettingsPanel',

	propTypes: {
		onClick: PropTypes.func,
		onSettings: PropTypes.func,
		title: PropTypes.string,
		settings: PropTypes.string
	},
	handlers:{
		setAlarmTime: (event, {onSettings}) => {
			event.preventDefault();
			const inputAlarmTimeModified = event.target.value + ':00'
			onSettings(inputAlarmTimeModified)
		  },
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
			});
		}
	},

	computed: {
		text: ({settings}) => `${settings.alarm}`
	},

	render: ({title, text, onClick, setAlarmTime,pruebaLS2, ...rest}) => {
		return (
			<Panel {...rest}>
				<Header title={title}>
				<Button onClick={onClick}>Atras</Button>
				</Header>
				<form><input type="time" onChange={setAlarmTime}/>
				</form>
				{text}
				<Button onClick={pruebaLS2}>Atras</Button>
			</Panel>
		);
	}
});

export default AlarmSettingsPanel;
