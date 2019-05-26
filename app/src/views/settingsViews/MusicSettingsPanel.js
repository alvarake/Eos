import Button from '@enact/moonstone/Button';
import { Header, Panel } from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import { pauseMedia, playMedia } from '../../actions/MusicActions';

const MusicSettingsPanel = kind({
	name: 'MusicSettingsPanel',

	propTypes: {
		music: PropTypes.object,
		onClick: PropTypes.func,
		onSettings: PropTypes.func,
		title: PropTypes.string,
	},

	handlers: {
		pause: (ev, { music }) => pauseMedia(music.sound),
		play: (ev, { music }) => playMedia(music.sound),
	},

	render: ({ music, onClick, onSettings, pause, play, title, ...rest }) => {
		return (
			<Panel {...rest}>
				<Header title={title}>
					<Button onClick={onClick}>Atras</Button>
				</Header>
				<Button onClick={onSettings}>{music.configured ? 'Borrar Cancion' : 'Cargar Cancion' }</Button>
				<Button onClick={play}>Play</Button>
				<Button onClick={pause}>Pausar</Button>
			</Panel>
		);
	}
});

export default MusicSettingsPanel;
