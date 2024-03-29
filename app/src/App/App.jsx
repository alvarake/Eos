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
import PorHacerSettingsPanel from '../views/settingsViews/PorHacerSettingsPaenl';

import AppStateDecorator from './AppStateDecorator';

import items from '../components/ItemConfigurable/items';

const RoutablePanels = Routable({ navigate: 'onBack' }, Panels);
const App = kind({
	name: 'App',
	propTypes: {
		alarm: PropTypes.object,
		bus: PropTypes.object,
		music: PropTypes.object,

		onAlarmRequest: PropTypes.func,
		onAlarmDeleteRequest: PropTypes.func,
		onAlarmSettings: PropTypes.func,

		onBusSettings: PropTypes.func,
		onBusRequest: PropTypes.func,

		onMusicSettings: PropTypes.func,
		onMusicSelected: PropTypes.func,
		onNavigate: PropTypes.func,

		path: PropTypes.string,
	},

	handlers: {
		onSettingsPanel: (ev, { onNavigate }) => onNavigate({ path: '/welcome/settings' }),
		onHomePanel: (ev, { onNavigate }) => onNavigate({ path: '/welcome/home' }),
		onMusicSettings: (ev, { music, onMusicSettings }) => onMusicSettings(music),
		onMusicSelected: (ev, { onMusicSelected }) => onMusicSelected(ev.value),
		onAlarmSettings: (ev, { onAlarmSettings }) => {
			const tiempo = `${ev.value.getHours()}:${ev.value.getMinutes()}`;
			onAlarmSettings(tiempo);
		},
		onAlarmRequest: (ev, { music, alarm, onAlarmRequest }) => onAlarmRequest({ music, alarm }),
		onAlarmDeleteRequest: (ev, { onAlarmDeleteRequest }) => onAlarmDeleteRequest(ev),
		onBusSettings: (ev, { bus, onBusSettings }) => onBusSettings({ newStopId: ev.value, bus }),
		onBusRequest: (ev, { bus, onBusRequest }) => onBusRequest(bus),
	},

	// eslint-disable-next-line
	render: ({ bus, music, onAlarmRequest, onAlarmDeleteRequest, onAlarmSettings, onBusRequest, onBusSettings, onHomePanel, onMusicSettings, onMusicSelected, onNavigate, onSettingsPanel, path, alarm, ...rest }) => {
		return (
			<RoutablePanels {...rest} arranger={SlideLeftArranger} onBack={onNavigate} path={path}>
				<Route path="welcome" component={Bienvenida} title="¡Buenos días!" onClick={onSettingsPanel}>
					<Route path="home" component={MainPanel} title="Home" onClick={onSettingsPanel} bus={bus} music={music} alarm={alarm} onDeleteAlarm={onAlarmDeleteRequest} />
					<Route path="settings" component={SettingsPanel} title="Configuración" arrayItems={items} onClick={onHomePanel} onNavigate={onNavigate}>
						<Route path="music" component={MusicSettingsPanel} title="Música" onClick={onSettingsPanel} onSettings={onMusicSettings} onSelect={onMusicSelected} music={music} />
						<Route path="alarm" component={AlarmSettingsPanel} title="Alarma" onClick={onSettingsPanel} onSettings={onAlarmSettings} onDeleteAlarm={onAlarmDeleteRequest} onRequest={onAlarmRequest} alarm={alarm} music={music} />
						<Route path="route" component={BusSettingsPanel} title="Parada de Bus" onClick={onSettingsPanel} onSettings={onBusSettings} onRequest={onBusRequest} bus={bus} />
						<Route path="weather" component={PorHacerSettingsPanel} title="Tiempo Atmosférico" onClick={onSettingsPanel} />
						<Route path="news" component={PorHacerSettingsPanel} title="Noticias" onClick={onSettingsPanel} />
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
