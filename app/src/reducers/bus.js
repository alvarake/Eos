const initialState = {
	stopid: '',
	accessToken: '',
	arrivals: '',
	lastArrivalsRequest: undefined,
	lastStopRequest: undefined,
	stopsInfo: undefined,
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
	case 'SET_LAST_BUS_REQUEST':
		return {
			...state,
			lastArrivalsRequest: action.lastArrivalsRequest,
		};
	case 'SET_LAST_STOP_REQUEST':
		return {
			...state,
			lastStopRequest: action.lastStopRequest,
		};
	case 'SET_STOPS_INFO':
		return {
			...state,
			stopsInfo: action.stopsInfo,
		};
	default:
		return state;
	}
}

export default bus;
