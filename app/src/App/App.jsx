import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import { Panels, Routable, Route } from '@enact/moonstone/Panels';
import PropTypes from 'prop-types';
import React from 'react';
import { SlideLeftArranger } from '@enact/ui/ViewManager';

import Bienvenida from '../views/Bienvenida';
import MainPanel from '../views/MainPanel';
import SettingsPanel from '../views/settingsViews/SettingsPanel';
import MusicSettingsPanel from '../views/settingsViews/MusicSettingsPanel';
import AlarmSettingsPanel from '../views/settingsViews/AlarmSettingsPanel';
import BusSettingsPanel from '../views/settingsViews/BusSettingsPanel';

import AppStateDecorator from './AppStateDecorator';

import items from '../components/ItemConfigurable/items';

const RoutablePanels = Routable({ navigate: 'onBack' }, Panels);
const App = kind({
	name: 'App',

	propTypes: {
		alarm: PropTypes.object,
		music: PropTypes.object,
		onAlarmSettings: PropTypes.func,
		onMusicSettings: PropTypes.func,
		onNavigate: PropTypes.func,
		path: PropTypes.string,
		state: PropTypes.object,
	},

	handlers: {
		onSettingsPanel: (ev, { onNavigate }) => onNavigate({ path: '/welcome/settings' }),
		onHomePanel: (ev, { onNavigate }) => onNavigate({ path: '/welcome/home' }),
		onMusicSettings: (ev, { music, onMusicSettings }) => onMusicSettings(music),
		onAlarmSettings: (ev, { music, onAlarmSettings }) => {
			onAlarmSettings({ ev, music });
		},
	},

	// eslint-disable-next-line
	render: ({ music, onAlarmSettings, onHomePanel, onMusicSettings, onNavigate, onSettingsPanel, path, alarm, ...rest }) => {
		return (
			<RoutablePanels {...rest} arranger={SlideLeftArranger} onBack={onNavigate} path={path}>
				<Route path="welcome" component={Bienvenida} title="¡Buenos días!" onClick={onSettingsPanel}>
					<Route path="home" component={MainPanel} title="Home" onClick={onSettingsPanel} />
					<Route path="settings" component={SettingsPanel} title="Settings" arrayItems={items} onClick={onHomePanel} onNavigate={onNavigate}>
						<Route path="music" component={MusicSettingsPanel} title="Music Settings" onClick={onSettingsPanel} onSettings={onMusicSettings} music={music} />
						<Route path="route" component={BusSettingsPanel} title="Route Settings" onClick={onSettingsPanel} />
						<Route path="alarm" component={AlarmSettingsPanel} title="Alarm Settings" onClick={onSettingsPanel} onSettings={onAlarmSettings} alarm={alarm} />
						<Route path="weather" component={MainPanel} title="Weather Settings" onClick={onSettingsPanel} />
						<Route path="news" component={MainPanel} title="News Settings" onClick={onSettingsPanel} />
					</Route>
				</Route>
			</RoutablePanels>
		);
	},
});

export default MoonstoneDecorator(
	AppStateDecorator(
		App,
	),
);
