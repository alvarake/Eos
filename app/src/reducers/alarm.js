const initialState = {
	alarmtime: '',
	alarmtimestamp: '',
};

function alarm(state = initialState, action) {
	switch (action.type) {
	case 'SET_ALARM_TIME':
		return {
			...state,
			alarmtime: action.alarmtime,
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
