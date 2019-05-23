import {combineReducers} from 'redux';
import path from '../reducers/router';
import alarm from '../reducers/alarm';
import music from '../reducers/music';

const rootReducer = combineReducers({
	path,
	alarm,
	music
});

export default rootReducer;



