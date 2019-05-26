import { combineReducers } from 'redux';
import path from './router';
import alarm from './alarm';
import music from './music';

const rootReducer = combineReducers({
	path,
	alarm,
	music,
});

export default rootReducer;
