const initialState = {
	alarms: [],
	possibleAlarms: [],
	alarmtimestamp: '',
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
			alarmtime: state.alarms.filter(alarmItem => alarmItem !== action.alarmtime),
		};
	case 'TIME_ALARM_WAS_CREATED':
		return {
			...state,
			alarmtimestamp: action.alarmtimestamp,
		};
	default:
		return state;
	}
}

export default alarm;
