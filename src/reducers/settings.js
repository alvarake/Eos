const initialState ={music: false, alarm: false}
function settings (state= initialState, action){
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

export default settings;