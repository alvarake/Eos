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
		title: PropTypes.string,
		arrayItems: PropTypes.array,
	},

	handlers: {
		onSelectItem: (ev, { onNavigate, arrayItems }) => {
			if (onNavigate) {
				onNavigate({ path: arrayItems[ev.index].path });
			}
		},
	},

	// eslint-disable-next-line
	render: ({ title, onClick, onSelectItem, arrayItems, ...rest }) => {
		return (
			<Panel {...rest}>
				<Header title={title}>
					<Button onClick={onClick}> Home </Button>
				</Header>
				<Repeater childComponent={ItemConfig} indexProp="index" itemProps={{ onSelect: onSelectItem }}>
					{arrayItems}
				</Repeater>
			</Panel>
		);
	},
});

export default SettingsPanel;
