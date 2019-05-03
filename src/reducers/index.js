import {combineReducers} from 'redux';
import path from '../reducers/router';
import settings from '../reducers/settings';

const rootReducer = combineReducers({
	path,
	settings
});

export default rootReducer;



