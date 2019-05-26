import LS2Request from '@enact/webos/LS2Request';

export const setBusSettings = (music) => {
	console.log('En setMusicSettings');
	return {
		type: 'SET_BUS_SETTINGS',
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

