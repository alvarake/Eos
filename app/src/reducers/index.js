import { combineReducers } from 'redux';
import path from './router';
import alarm from './alarm';
import music from './music';
import bus from './bus';

const rootReducer = combineReducers({
	alarm,
	bus,
	music,
	path,
});

export default rootReducer;
