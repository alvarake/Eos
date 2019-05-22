import LS2Request from '@enact/webos/LS2Request';

export const set_music_settings = (music) => {
	return {
		type: "SET_MUSIC_SETTINGS",
		music
	}
}

const play_Media = (mediaId)=> {
	return new LS2Request().send({
		service: 'luna://com.webos.media',
		method:"play",
		parameters:{
			mediaId : mediaId
		},
		onSuccess: (res) => {
			console.log(res)
			console.log(mediaId)
		},
		onFailure: (res) => {
			console.log(res)
		},
	});
};

export const unload_Media = (mediaId) => dispatch => {
	return new LS2Request().send({
		service: 'luna://com.webos.media',
		method: 'unload',
		parameters:{
			mediaId : mediaId
		},
		onSuccess: (res) => {
			console.log("Se ha terminado de des-cargar el archivo")
			console.log(res)
			const music ={sound: "", configured:false};
			dispatch(set_music_settings(music));
		},
		onFailure: (res) => {
			console.log(res)
		},
	});
};

export const load_Media = music => dispatch => {
	console.log("TERCERO en load_Media es: ")
	console.log(music)
	return new LS2Request().send({
		service: 'luna://com.webos.media',
		method: 'load',
		parameters:{
			uri: 'https://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp3',
			type :'media',
			payload: {
				option: {
					appId: "eos"
				}
			}
		},
		onSuccess: (res) => {
			console.log("Se ha terminado de cargar el archivo");
			console.log(res);
			music ={sound: res.mediaId, configured:true};
			dispatch(set_music_settings(music));
			dispatch(play_Media(res.mediaId));
		},
		onFailure: (res) => {
			console.log(res)
			music ={sound: "", configured:false};
			dispatch(set_music_settings(music));

		},
	});
};

