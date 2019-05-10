import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {Panels, Routable, Route} from '@enact/moonstone/Panels';
import PropTypes from 'prop-types';
import React from 'react';
import {SlideLeftArranger} from '@enact/ui/ViewManager';

import Bienvenida from '../views/Bienvenida';
import MainPanel from '../views/MainPanel';
import SettingsPanel from '../views/SettingsPanel';
import MusicSettingsPanel from '../views/settingsViews/MusicSettingsPanel'
import AlarmSettingsPanel from '../views/settingsViews/AlarmSettingsPanel'

import AppStateDecorator from '../containers/AppStateDecorator.jsx';
import items from '../components/ItemConfigurable/items'

const RoutablePanels = Routable({navigate: 'onBack'}, Panels);
const App = kind({
	name: 'App',

	propTypes: {
		onMusicSettings: PropTypes.func,
		onAlarmSettings: PropTypes.func,
		settings: PropTypes.object,
		onNavigate: PropTypes.func,
		path: PropTypes.string
	},

	handlers: {
		onSettingsPanel: (ev, {onNavigate}) => onNavigate({path: '/welcome/settings'}),
		onHomePanel: (ev, {onNavigate}) => onNavigate({path: '/welcome/home'}),
		onMusicSettings: (ev, {settings, onMusicSettings}) => onMusicSettings({settings: !settings.music}),
		onAlarmSettings:(ev, {onAlarmSettings}) => {
			console.log(ev)
			onAlarmSettings({params: {
				message: "Alarma Puesta por alvaro",
				buttons:[
					{label:"button1", onclick:"luna://com.webos.applicationManager/launch", params:{id:"com.webos.app.settings"}},
					{label:"button2", focus:true},
			]
			}})
		}
	},

	render: ({onNavigate, settings, onMusicSettings, onAlarmSettings, onSettingsPanel, onHomePanel, path, ...rest}) => {
		return (
			<RoutablePanels {...rest} arranger={SlideLeftArranger} onBack={onNavigate} path={path}>
				<Route path="welcome" component={Bienvenida} title="¡Buenos días!" onClick={onSettingsPanel}>
					<Route path="home" component={MainPanel}  title="Home" onClick={onSettingsPanel}/>
					<Route path="settings" component={SettingsPanel} title="Settings" arrayItems={items} onClick={onHomePanel} onNavigate={onNavigate} >
						<Route path="music" component={MusicSettingsPanel} title="Music Settings" onClick={onSettingsPanel} onSettings={onMusicSettings} settings={settings}/>
						<Route path="route" component={MainPanel} title="Route Settings" onClick={onSettingsPanel}/>
						<Route path="alarm" component={AlarmSettingsPanel} title="Alarm Settings" onClick={onSettingsPanel} onSettings={onAlarmSettings} settings={settings}/>
						<Route path="weather" component={MainPanel} title="Weather Settings" onClick={onSettingsPanel}/>
						<Route path="news" component={MainPanel} title="News Settings" onClick={onSettingsPanel}/>
					</Route>
				</Route>
			</RoutablePanels>
		);
	}
});

export default MoonstoneDecorator(
	AppStateDecorator(
		App
	)
);
