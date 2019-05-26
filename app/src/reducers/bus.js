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
	default:
		return state;
	}
}

export default bus;
