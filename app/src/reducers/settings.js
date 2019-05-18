

const initialState ={
	music: false,
	alarm: {
		time: "",
		notification: {
			alertId: "",
			returnValue:""
		}
	}
}

function settings (state= initialState, action){
	switch (action.type) {
		case 'SET_MUSIC_SETTINGS':
			//return action.music;
			return {
				...state,
				music: action.music
			}
		case 'SET_ALARM_TIME':
		return {
			...state,
			alarm: {
				...state.alarm,
				time: action.time
			}
		}
		case 'CREATE_ALARM_TIME':
		return {
			...state,
			alarm: {
				...state.alarm,
				key: action.payload.key,
				returnValue: action.payload.returnValue,
				errorText: action.payload.errorText
			}
		}
		case 'SET_NOTIFICATION':
		return {
			...state,
			notification: {
				alertId: action.payload.alertId,
				returnValue: action.payload.returnValue
			}
		}
		case 'CLOSE_NOTIFICATION':
		return {
			...state,
			notification: {
			}
		}
		default:
			return state;
	}
}

export default settings;