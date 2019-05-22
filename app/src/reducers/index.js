import {combineReducers} from 'redux';
import path from '../reducers/router';
import settings from '../reducers/settings';
import music from '../reducers/music';

const rootReducer = combineReducers({
	path,
	settings,
	music
});

export default rootReducer;



