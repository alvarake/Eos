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
		size: PropTypes.number
	},
	styles: {
		css,
		className: 'itemConfigurable'
	},

	handlers:{
		onSelect: (ev, {index, onSelect}) => {
			if (onSelect) {
				onSelect({index});
			}
		}
	},

	computed: {
		url: (children) => {
			return `src/components/ItemConfigurable/imagenes/${children.url_img}`;
		},
		text: (children) => {
			return `${children.type}`;
		}
	},

	render: ({text, onSelect, url, ...rest}) => {
		delete rest.size;
		delete rest.index;

		return (
			<div {...rest} onClick={onSelect}>
				<img src={url}  width="215" height="400"/>
				<div>{text}</div>
			</div>
		);
	}
});

const ItemConfig = Spottable(ItemConfigBase);

export default ItemConfig;
export {ItemConfig, ItemConfigBase};
