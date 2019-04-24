import Button from '@enact/moonstone/Button';
import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

const MusicSettingsPanel = kind({
	name: 'MusicSettingsPanel',

	propTypes: {
		next: PropTypes.string,
		onClick: PropTypes.func,
		title: PropTypes.string
	},

	render: ({title, onClick, ...rest}) => {
		delete rest.next;
		return (
			<Panel {...rest}>
				<Header title={title}>
				<Button onClick={onClick}>Configuración</Button>
				</Header>
			</Panel>
		);
	}
});

export default MusicSettingsPanel;
