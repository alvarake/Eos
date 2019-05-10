import LS2Request from '@enact/webos/LS2Request';

function set_alarm (res) {
	return {
		type: 'SET_ALARM_TIME',
		payload: res
	};
}

function close_notification (res) {
	return {
		type: 'CLOSE_NOTIFICATION',
		payload: res
	};
}

// function returning function!
export const alarm_set = params => dispatch => {
	// possible to dispatch an action at the start of fetching
	// dispatch({type: 'FETCH_SYSETEM_SETTINGS'});
	return new LS2Request().send({
		service: 'com.webos.service.alarm',
		method: 'set',
		parameters: params,
		onSuccess: (res) => {
			console.log(res)
			// dispatches action on success callback with payload
			dispatch(set_alarm(res));
		}
	});
};

export const notification_createAlert = params => dispatch => {
	console.log("entro en el notification")
	// possible to dispatch an action at the start of fetching
	// dispatch({type: 'FETCH_SYSETEM_SETTINGS'});
	return new LS2Request().send({
		service: 'luna://com.webos.notification',
		method: 'createAlert',
		parameters: params,
		onSuccess: (res) => {
			console.log("Has tenido exito en hacer la comunicacion")
			console.log(res)
			// dispatches action on success callback with payload
			dispatch(set_notification(res));
		},
		onFailure: (res) => {
			console.log("Has fallado en hacer la comunicacion")
			console.log(res);
		},
		timeout: 20000,
		onTimeout: () => {
			console.log("Se agoto el tiempo de espera")
		}
	});
};

function set_notification (res) {
	console.log("Res : ")
	console.log(res)
	return {
		type: 'SET_NOTIFICATION',
		payload: res
	};
}

export const notification_closeAlert = params => dispatch => {
	// possible to dispatch an action at the start of fetching
	// dispatch({type: 'FETCH_SYSETEM_SETTINGS'});
	return new LS2Request().send({
		service: 'com.webos.notification',
		method: 'closeAlert',
		parameters: params,
		onSuccess: (res) => {
			// dispatches action on success callback with payload
			dispatch(close_notification(res));
		},
		onFailure: (res) => {
			console.log(res);
	}} );
};