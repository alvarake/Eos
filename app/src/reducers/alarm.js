const initialState ={
	configured: false,
	alarmtime: "",
	alarmtimestamp: "",
	notification: {
		alertId: "",
		returnValue:""
	}
}

function alarm (state= initialState, action){
	switch (action.type) {
		case 'SET_ALARM_TIME':
		return {
			...state,
			alarmtime: action.alarmtime
		}
		case 'TIME_ALARM_WAS_CREATED':
		return {
			...state,
			alarmtimestamp: action.alarmtimestamp
		}
		case 'ALARM_CONFIGURED':
			return {
				...state,
				configured: action.configured
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

export default alarm;