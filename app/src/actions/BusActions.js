import LS2Request from '@enact/webos/LS2Request';

const setBusSettings = (stopid) => {
	console.log('En setBusSettings');
	return {
		type: 'SET_BUS_SETTINGS',
		stopid,
	};
};

const setEMTAccessToken = (accessToken) => {
	console.log('En setEMTAccessToken');
	console.log(accessToken);
	return {
		type: 'SET_EMT_ACCESSTOKEN',
		accessToken,
	};
};

export const loginEMT = () => (dispatch) => {
	console.log('En loginEMT');
	return new LS2Request().send({
		service: 'luna://eos.busservice',
		method: 'login',
		onSuccess: (res) => {
			console.log('Se ha pedido el tokken');
			console.log(res);
			dispatch(setEMTAccessToken(res.accessToken));
		},
		onFailure: (res) => {
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
			console.log(res);
			dispatch(setBusSettings(res.stopid));
		},
		onFailure: (res) => {
			console.log(res);
		},
	});
};
