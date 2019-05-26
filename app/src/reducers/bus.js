const initialState = {
	stopid: '',
};

function bus(state = initialState, action) {
	switch (action.type) {
	case 'SET_BUS_SETTINGS':
		return {
			...state,
			stopid: action.stopid,
		};
	default:
		return state;
	}
}

export default bus;
