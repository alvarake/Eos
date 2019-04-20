import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {Panels, Routable, Route} from '@enact/moonstone/Panels';
import PropTypes from 'prop-types';
import React from 'react';
import {SlideLeftArranger} from '@enact/ui/ViewManager';

import Bienvenida from '../views/Bienvenida';
import MainPanel from '../views/MainPanel';

import AppStateDecorator from './AppStateDecorator';

const RoutablePanels = Routable({navigate: 'onBack'}, Panels);

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
		onHomePanel: (ev, {onNavigate}) => onNavigate({path: '/welcome/home'}),
		onFourthPanel: (ev, {onNavigate}) => onNavigate({path: '/welcome/home/fourth'})

	},

	render: ({onWelcomePanel, onFourthPanel, onNavigate, onSettingsPanel, onHomePanel, path, ...rest}) => {
		return (
			<RoutablePanels {...rest} arranger={SlideLeftArranger} onBack={onNavigate} path={path}>
				<Route path="welcome" component={Bienvenida} title="¡Buenos días!" onClick={onSettingsPanel}>
					<Route path="settings" component={MainPanel} next="welcome" title="Settings" onClick={onWelcomePanel} />
					<Route path="home" component={MainPanel} next="welcome" title="Home" onClick={onWelcomePanel}>
						<Route path="fourth" component={MainPanel} next="home" title="Fourth" onClick={onHomePanel} />
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
