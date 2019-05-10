import Button from '@enact/moonstone/Button';
import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

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
		  }
	},

	computed: {
		text: ({settings}) => `${settings.alarm}`
	},

	render: ({title, text, onClick, setAlarmTime, ...rest}) => {
		return (
			<Panel {...rest}>
				<Header title={title}>
				<Button onClick={onClick}>Atras</Button>
				</Header>
				<form><input type="time" onChange={setAlarmTime}/>
				</form>
				{text}
			</Panel>
		);
	}
});

export default AlarmSettingsPanel;
