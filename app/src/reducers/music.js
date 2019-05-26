const initialState = {
	mediaid: '',
};

function music(state = initialState, action) {
	switch (action.type) {
	case 'SET_MUSIC_SETTINGS':
		return {
			...state,
			mediaid: action.mediaid,
		};
	default:
		return state;
	}
}

export default music;
