import LS2Request from '@enact/webos/LS2Request';

const setBusSettings = (stopid) => {
	return {
		type: 'SET_BUS_SETTINGS',
		stopid,
	};
};

const setEMTAccessToken = (accessToken) => {
	return {
		type: 'SET_EMT_ACCESSTOKEN',
		accessToken,
	};
};

const setArrivalsInfo = (arrivals) => {
	return {
		type: 'SET_ARRIVALS_INFO',
		arrivals,
	};
};
export const timeToArrive = ({ stopid, accessToken }) => (dispatch) => {
	console.log('En timeToArrive');
	return new LS2Request().send({
		service: 'luna://eos.busservice',
		method: 'arrivalbus',
		parameters: { stopid, accessToken },
		subscribe: true,
		onSuccess: (res) => {
			console.log('----------------------------------');
			console.log(`Nombre de la parada ${stopid}: ${res.nombreParada}`);
			console.log('Lineas de esta parada:');
			console.log(res.StopLines.Data);
			console.log('*************');
			console.log('Las llegadas son:');
			console.log(res.Arrive);
			console.log('*************');
			dispatch(setArrivalsInfo(res));
		},
		onFailure: (res) => {
			console.log('Problema en timeToArrive');
			console.log(res);
		},
	});
};

export const loadStopInfo = ({ stopid, accessToken }) => (dispatch) => {
	console.log('En loadStopInfo');
	return new LS2Request().send({
		service: 'luna://eos.busservice',
		method: 'stopdetail',
		parameters: { stopid, accessToken },
		onSuccess: (res) => {
			console.log(res.data);
			dispatch(setBusSettings(stopid));
			dispatch(setEMTAccessToken(res.accessToken));
			dispatch(timeToArrive({ stopid, accessToken: res.accessToken }));
		},
		onFailure: (res) => {
			console.log(res);
		},
	});
};




