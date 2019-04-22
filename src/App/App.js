import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {Panels, Routable, Route} from '@enact/moonstone/Panels';
import PropTypes from 'prop-types';
import React from 'react';
import {SlideLeftArranger} from '@enact/ui/ViewManager';

import Bienvenida from '../views/Bienvenida';
import MainPanel from '../views/MainPanel';
import SettingsPanel from '../views/SettingsPanel';

import AppStateDecorator from './AppStateDecorator';

const RoutablePanels = Routable({navigate: 'onBack'}, Panels);

let music = {type:'Music', path:'/welcome/settings/music', url_img:'music.jpg'};
let alarm = {type:'Alarm', path:'/welcome/settings/alarm', url_img:'clock.jpg'};
let route = {type:'Route', path:'/welcome/settings/route', url_img:'bus.jpeg'};
let weather = {type:'Weather', path:'/welcome/settings/weather', url_img:'weather.jpg'};
let news = {type:'News', path:'/welcome/settings/news', url_img:'newspaper.jpg'};

const items = [
	music,
	alarm,
	route,
	weather,
	news
];

/* const items = [
	'music.jpg',
	'clock.jpg',
	'bus.jpeg',
	'weather.jpg',
	'newspaper.jpg'
];
 */
const App = kind({
	name: 'App',

	propTypes: {
		onNavigate: PropTypes.func,
		path: PropTypes.string,
		onConfiguration: PropTypes.func,
		configuration: PropTypes.string
	},

	handlers: {
		onWelcomePanel: (ev, {onNavigate}) => onNavigate({path: '/welcome'}),
		onSettingsPanel: (ev, {onNavigate}) => onNavigate({path: '/welcome/settings'}),
		onHomePanel: (ev, {onNavigate}) => onNavigate({path: '/welcome/home'})
	},

	render: ({onNavigate, onSettingsPanel, onHomePanel, path, ...rest}) => {
		return (
			<RoutablePanels {...rest} arranger={SlideLeftArranger} onBack={onNavigate} path={path}>
				<Route path="welcome" component={Bienvenida} title="¡Buenos días!" onClick={onSettingsPanel}>
					<Route path="home" component={MainPanel} next="welcome" title="Home" onClick={onSettingsPanel}/>
					<Route path="settings" component={SettingsPanel} title="Settings" arrayItems={items} onClick={onHomePanel}  onNavigate={onNavigate}>
						<Route path="music" component={MainPanel} title="Music Settings" onClick={onSettingsPanel}/>
						<Route path="route" component={MainPanel} title="Route Settings" onClick={onSettingsPanel}/>
						<Route path="alarm" component={MainPanel} title="Alarm Settings" onClick={onSettingsPanel}/>
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
