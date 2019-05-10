import {createStore, applyMiddleware} from 'redux';

import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';

export default function configureStore (initialState) {
	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunkMiddleware)
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers').default;

			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
