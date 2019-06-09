import Button from '@enact/moonstone/Button';
import { Header, Panel } from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import ExpandablePicker from '@enact/moonstone/ExpandablePicker';
import { pauseMedia, playMedia } from '../../actions/MusicActions';


const MusicSettingsPanel = kind({
	name: 'MusicSettingsPanel',

	propTypes: {
		music: PropTypes.object,
		onClick: PropTypes.func,
		onSettings: PropTypes.func,
		onSelect: PropTypes.func,
		title: PropTypes.string,
	},

	handlers: {
		pause: (ev, { music }) => pauseMedia(music.mediaid),
		play: (ev, { music }) => playMedia(music.mediaid),
	},

	// eslint-disable-next-line
	render: ({ music, onClick, onSelect, onSettings, pause, play, title, ...rest }) => {
		return (
			<Panel {...rest}>
				<Header title={title} titleBelow="Configurando el sonido de la alarma.">
					<Button onClick={onClick}>Atras</Button>
				</Header>

				<ExpandablePicker defaultValue={0} onChange={onSelect} title="Elige una canción" width="medium"> {['Opción 1', 'Opción 2']}  </ExpandablePicker>

				<Button onClick={onSettings}>{music.mediaid ? 'Borrar Cancion' : 'Cargar Cancion' }</Button>
				<Button onClick={play}>Play</Button>
				<Button onClick={pause}>Pausar</Button>
			</Panel>
		);
	},
});

export default MusicSettingsPanel;
