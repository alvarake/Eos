import Button from '@enact/moonstone/Button';
import { Header, Panel } from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import Repeater from '@enact/ui/Repeater';

import ItemConfig from '../../components/ItemConfigurable/ItemConfigurable';

const SettingsPanel = kind({
	name: 'SettingsPanel',

	propTypes: {
		onClick: PropTypes.func,
		onNavigate: PropTypes.func,
		title: PropTypes.string,
		arrayItems: PropTypes.array,
	},

	// eslint-disable-next-line
	render: ({ title, onClick, onNavigate, arrayItems, ...rest }) => {
		return (
			<Panel {...rest}>
				<Header title={title} titleBelow="Menú de configuración.">
					<Button onClick={onClick}> Home </Button>
				</Header>
				<Repeater childComponent={ItemConfig} indexProp="index" itemProps={{ onSelect: onNavigate }}>
					{arrayItems}
				</Repeater>
			</Panel>
		);
	},
});

export default SettingsPanel;
