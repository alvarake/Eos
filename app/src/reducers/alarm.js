const initialState = {
	alarms: [],
	possibleAlarms: [],
};

function alarm(state = initialState, action) {
	switch (action.type) {
	case 'SET_ALARM_TIME':
		if (!state.alarms.includes(action.alarmtime)) {
			return {
				...state,
				alarms: [...state.alarms, action.alarmtime],
				possibleAlarms: [],
			};
		}
		return {
			...state,
			possibleAlarms: [],
		};

	case 'POSSIBLE_ALARM_WAS_SELECTED':
		return {
			...state,
			possibleAlarms: [...state.possibleAlarms, action.possibleAlarm],
		};
	case 'DELETE_ALARM_TIME':
		return {
			...state,
			alarms: state.alarms.filter(alarmItem => alarmItem !== action.keyAlarm),
		};
	default:
		return state;
	}
}

export default alarm;
