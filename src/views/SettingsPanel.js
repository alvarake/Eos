import Button from '@enact/moonstone/Button';
import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import Repeater from '@enact/ui/Repeater';

import ItemConfig from '../components/ItemConfigurable/ItemConfigurable.js';

const SettingsPanel = kind({
	name: 'SettingsPanel',

	propTypes: {
		next: PropTypes.string,
		onClick: PropTypes.func,
		title: PropTypes.string,
		arrayItems: PropTypes.array
	},

	handlers: {
		onSelectItem: (ev, {onNavigate, arrayItems}) => {
				if (onNavigate) {
					onNavigate({path: arrayItems[ev.index].path}
					);
				}
		}

	},

	render: ({title, onClick, onSelectItem, arrayItems, ...rest}) => {
		delete rest.next;
		return (
			<Panel {...rest}>
				<Header title={title} >
				<Button onClick={onClick}> Home </Button>
				</Header>
				<Repeater childComponent={ItemConfig} indexProp="index" itemProps={{onSelect: onSelectItem}}>
				{arrayItems}
				</Repeater>
			</Panel>
		);
	}
});

export default SettingsPanel;

