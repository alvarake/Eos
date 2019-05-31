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

const setLastBusRequest = (lastArrivalsRequest) => {
	return {
		type: 'SET_LAST_BUS_REQUEST',
		lastArrivalsRequest,
	};
};

const setStopsInfo = (stopsInfo) => {
	console.log('En stopsInfo');
	return {
		type: 'SET_STOPS_INFO',
		stopsInfo,
	};
};


export const timeToArrive = ({ stopid, accessToken, lastArrivalsRequest }) => (dispatch) => {
	if (lastArrivalsRequest) {
		lastArrivalsRequest.cancel();
	}
	console.log('En timeToArrive');
	const ArrivalsRequest = new LS2Request().send({
		service: 'luna://eos.busservice',
		method: 'arrivalbus',
		parameters: { stopid, accessToken },
		subscribe: true,
		onSuccess: (res) => {
			dispatch(setArrivalsInfo(res));
		},
		onFailure: (res) => {
			console.log('Problema en timeToArrive');
			console.log(res);
		},
	});
	dispatch(setLastBusRequest(ArrivalsRequest));
	return ArrivalsRequest;
};

export const loadStopInfo = ({ stopid, accessToken }) => (dispatch) => {
	console.log('En loadStopInfo');
	dispatch(setBusSettings(stopid));
	return new LS2Request().send({
		service: 'luna://eos.busservice',
		method: 'stopdetail',
		parameters: { stopid, accessToken },
		onSuccess: (res) => {
			dispatch(setEMTAccessToken(res.accessToken));
			dispatch(setStopsInfo(res.stopsInfo));
		},
		onFailure: (res) => {
			console.log(res);
		},
	});
};
