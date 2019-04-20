import {combineReducers} from 'redux';

function path (state = '/welcome', action) {
	switch (action.type) {
		case 'NAVIGATE':
			return action.path;
		default:
			return state;
	}
}

function configuration (state = "False", action) {
	switch (action.type) {
		case 'SET_CONFIGURATION':
			return action.configuration;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	path,
	configuration
});

export default rootReducer;
