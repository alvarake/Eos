import Button from '@enact/moonstone/Button';
import { Header, Panel } from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import TimePicker from '@enact/moonstone/TimePicker';
import AlarmList from '../../components/AlarmList/AlarmList';

const AlarmSettingsPanel = kind({
	name: 'AlarmSettingsPanel',

	propTypes: {
		alarm: PropTypes.object,
		onClick: PropTypes.func,
		onRequest: PropTypes.func,
		onDeleteAlarm: PropTypes.func,
		onSettings: PropTypes.func,
		title: PropTypes.string,
	},


	// eslint-disable-next-line
	render: ({ alarm, title, onClick, onDeleteAlarm, onRequest, onSettings, ...rest }) => {
		return (
			<Panel {...rest}>
				<Header title={title} titleBelow="Configurando la hora de la alarma.">
					<Button onClick={onClick}>Atras</Button>
				</Header>
				<TimePicker title="¿Cuando quieres despertarte?" defaultValue={new Date()} onChange={onSettings} onClose={onRequest} />
				<AlarmList alarm={alarm} onDelete={onDeleteAlarm} />
			</Panel>
		);
	},
});

export default AlarmSettingsPanel;
