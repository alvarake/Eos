const initialState = {
	stopid: '',
	accessToken: '',
	arrivals: '',
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
	case 'SET_ARRIVALS_INFO':
		return {
			...state,
			arrivals: action.arrivals,
		};
	default:
		return state;
	}
}

export default bus;
