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

const setLastStopRequest = (lastStopRequest) => {
	return {
		type: 'SET_LAST_STOP_REQUEST',
		lastStopRequest,
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

export const loadStopInfo = ({ stopid, bus }) => (dispatch) => {

	console.log('En loadStopInfo');
	if (bus.lastStopRequest) {
		bus.lastStopRequest.cancel();
	}
	dispatch(setBusSettings(stopid));
	const stopRequest = new LS2Request().send({
		service: 'luna://eos.busservice',
		method: 'stopdetail',
		parameters: { stopid, accessToken: bus.accessToken },
		onSuccess: (res) => {
			dispatch(setEMTAccessToken(res.accessToken));
			dispatch(setStopsInfo(res.stopsInfo));
		},
		onFailure: (res) => {
			console.log(res);
		},
	});
	dispatch(setLastStopRequest(stopRequest));
	return stopRequest;
};
