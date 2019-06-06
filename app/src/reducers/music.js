const initialState = {
	mediaid: '',
	cancion: 0,
};

function music(state = initialState, action) {
	switch (action.type) {
	case 'SET_MUSIC_SETTINGS':
		return {
			...state,
			mediaid: action.mediaid,
		};
	case 'SET_SONG':
		return {
			...state,
			cancion: action.cancion,
		};
	default:
		return state;
	}
}

export default music;
