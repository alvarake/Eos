import Button from '@enact/moonstone/Button';
import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import TimePicker from '@enact/moonstone/TimePicker';

const AlarmSettingsPanel = kind({
	name: 'AlarmSettingsPanel',

	propTypes: {
		onClick: PropTypes.func,
		onSettings: PropTypes.func,
		title: PropTypes.string,
		settings: PropTypes.string
	},
	handlers:{
		setAlarmTime: (ev, {onSettings}) => {
			console.log(`La hora es : ${ev.value.getHours()}: ${ev.value.getMinutes()}`)
			onSettings(ev.value)
		}
	},

	render: ({title, onClick, setAlarmTime, ...rest}) => {
		return (
			<Panel {...rest}>
				<Header title={title}>
				<Button onClick={onClick}>Atras</Button>
				</Header>
				<TimePicker defaultValue={new Date()} onChange={setAlarmTime}/>
			</Panel>
		);
	}
});

export default AlarmSettingsPanel;