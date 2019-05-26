import LS2Request from '@enact/webos/LS2Request';

export const setMusicSettings = (music) => {
	console.log('En setMusicSettings');
	return {
		type: 'SET_MUSIC_SETTINGS',
		music,
	};
};

export const playMedia = (mediaId) => {
	console.log('En playMedia');
	return new LS2Request().send({
		service: 'luna://com.webos.media',
		method: 'play',
		parameters: {
			mediaId,
		},
		onSuccess: (res) => {
			console.log(res);
		},
		onFailure: (res) => {
			console.log(res);
		},
	});
};

export const pauseMedia = (mediaId) => {
	console.log('En pauseMedia');
	return new LS2Request().send({
		service: 'luna://com.webos.media',
		method: 'pause',
		parameters: {
			mediaId,
		},
		onSuccess: (res) => {
			console.log('Se ha pausado el archivo');
			console.log(res);
		},
		onFailure: (res) => {
			console.log(res);
		},
	});
};

export const unloadMedia = mediaId => (dispatch) => {
	console.log('En unloadMedia');
	return new LS2Request().send({
		service: 'luna://com.webos.media',
		method: 'unload',
		parameters: {
			mediaId,
		},
		onSuccess: (res) => {
			console.log('Se ha terminado de des-cargar el archivo');
			console.log(res);
			const music = { sound: '', configured: false };
			dispatch(setMusicSettings(music));
		},
		onFailure: (res) => {
			console.log(res);
		},
	});
};

export const loadMedia = () => (dispatch) => {
	console.log('En loadMedia');
	console.log(dispatch);
	return new LS2Request().send({
		service: 'luna://com.webos.media',
		method: 'load',
		parameters: {
			uri: 'https://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp3',
			type: 'media',
			payload: {
				option: {
					appId: 'eos',
				},
			},
		},
		onSuccess: (res) => {
			console.log('Se ha terminado de cargar el archivo');
			console.log(res);
			const musicConfingSucces = { sound: res.mediaId, configured: true };
			dispatch(setMusicSettings(musicConfingSucces));
		},
		onFailure: (res) => {
			console.log(res);
			const musicConfingFailure = { sound: '', configured: false };
			dispatch(setMusicSettings(musicConfingFailure));
		},
	});
};
