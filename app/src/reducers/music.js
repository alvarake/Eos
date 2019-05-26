const initialState = {
	configured: false,
	sound: '',
};

function music(state = initialState, action) {
	switch (action.type) {
	case 'SET_MUSIC_SETTINGS':
		return {
			...state,
			configured: action.music.configured,
			sound: action.music.sound,
		};
	default:
		return state;
	}
}

export default music;
