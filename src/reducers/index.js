import {combineReducers} from 'redux';

function path (state = '/welcome', action) {
	switch (action.type) {
		case 'NAVIGATE':
			return action.path;
		default:
			return state;
	}
}
function settings (state={}, action){
	switch (action.type) {
		case 'SET_MUSIC_SETTINGS':
			//return action.music;
			return {
				...state,
				music: action.music
			}
		case 'SET_ALARM_SETTINGS':
		return {
			...state,
			alarm: action.alarm
		}
		default:
			return state;
	}
}
const rootReducer = combineReducers({
	path,
	settings
});

export default rootReducer;
