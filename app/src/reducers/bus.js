const initialState = {
	stopid: '',
	accessToken: '',
};

function bus(state = initialState, action) {
	switch (action.type) {
	case 'SET_BUS_SETTINGS':
		return {
			...state,
			stopid: action.stopid,
		};
	case 'SET_EMT_ACCESSTOKEN':
		return {
			...state,
			accessToken: action.accessToken,
		};
	case 'SET_LAST_TIMESTAMP_ARRIVAL_BUS':
		return {
			...state,
			timestamp: action.timestamp,
		};
	default:
		return state;
	}
}

export default bus;
