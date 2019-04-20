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
const items = [
	'music.jpg',
	'clock.jpg',
	'bus.jpeg',
	'newspaper.jpg',
	'weather.jpg'
];
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

	render: ({onWelcomePanel, onNavigate, onSettingsPanel, onHomePanel, path, ...rest}) => {
		return (
			<RoutablePanels {...rest} arranger={SlideLeftArranger} onBack={onNavigate} path={path}>
				<Route path="welcome" component={Bienvenida} title="¡Buenos días!" onClick={onSettingsPanel}>
					<Route path="home" component={MainPanel} next="welcome" title="Home" onClick={onSettingsPanel}/>
					<Route path="settings" component={SettingsPanel} title="Settings" onClick={onHomePanel} arrayItems={items} >
						
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
