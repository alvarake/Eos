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
		onFirstPanel: (ev, {onNavigate}) => onNavigate({path: '/first'}),
		onSecondPanel: (ev, {onNavigate}) => onNavigate({path: '/first/second'}),
		onThirdPanel: (ev, {onNavigate}) => onNavigate({path: '/first/third'}),
		onFourthPanel: (ev, {onNavigate}) => onNavigate({path: '/first/third/fourth'}),
		onFirstConfiguration: (ev, {onConfiguration}) => onConfiguration({configuration: 'True'}),

	},

	render: ({onFirstPanel, onFourthPanel, onNavigate, onSecondPanel, onThirdPanel, path, onFirstConfiguration, configuration, ...rest}) => {
		return (
			<RoutablePanels {...rest} arranger={SlideLeftArranger} onBack={onNavigate} path={path}>
				<Route path="first" component={Bienvenida} title="¡Buenos días!" onClick={onFirstConfiguration}>
					<Route path="second" component={MainPanel} next="fourth" title="Second" onClick={onFourthPanel} />
					<Route path="third" component={MainPanel} next="first" title="Third" onClick={onFirstPanel}>
						<Route path="fourth" component={MainPanel} next="third" title="Fourth" onClick={onThirdPanel} />
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
