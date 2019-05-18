import Button from '@enact/moonstone/Button';
import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

const MusicSettingsPanel = kind({
	name: 'MusicSettingsPanel',

	propTypes: {
		onClick: PropTypes.func,
		onSettings: PropTypes.func,
		title: PropTypes.string
	},

	render: ({title, onClick, onSettings, ...rest}) => {
		return (
			<Panel {...rest}>
				<Header title={title}>
				<Button onClick={onClick}>Atras</Button>
				</Header>
				<Button onClick={onSettings}>Configurar Música</Button>
			</Panel>
		);
	}
});

export default MusicSettingsPanel;
