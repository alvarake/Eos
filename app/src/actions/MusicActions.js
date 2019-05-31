import LS2Request from '@enact/webos/LS2Request';

export const setMusicSettings = (mediaid) => {
	console.log('En setMusicSettings');
	return {
		type: 'SET_MUSIC_SETTINGS',
		mediaid,
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
			dispatch(setMusicSettings(''));
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
			uri: 'http://se-sycdn.kuwo.cn/resource/n3/67/24/286388541.mp3',
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
			dispatch(setMusicSettings(res.mediaId));
		},
		onFailure: (res) => {
			console.log(res);
			dispatch(setMusicSettings(''));
		},
	});
};
