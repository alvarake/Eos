import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Spottable from '@enact/spotlight/Spottable';
import css from './ItemConfigurable.less';


const ItemConfigBase = kind({
	name: 'ItemConfig',

	propTypes: {
		children: PropTypes.array,
		index: PropTypes.number,
		onSelect: PropTypes.func,
	},

	styles: {
		css,
		className: 'itemConfigurable',
	},

	handlers: {
		onSelect: (ev, { path, onSelect }) => (onSelect({ path })),
	},

	computed: {
		url: children => `${children.url_img}`,
		text: children => `${children.type}`,
	},

	// eslint-disable-next-line object-curly-newline
	render: ({ text, onSelect, url, ...rest }) => {
		// eslint-disable-next-line no-param-reassign
		delete rest.index;
		return (
			<div {...rest} onClick={onSelect} onKeyPress={onSelect} role="button" tabIndex="0">
				<img alt="Menu" src={url} width="315" height="400" />
				<div>{text}</div>
			</div>
		);
	},
});
const ItemConfigurable = Spottable(ItemConfigBase);
export { ItemConfigurable, ItemConfigBase };
export default ItemConfigurable;
