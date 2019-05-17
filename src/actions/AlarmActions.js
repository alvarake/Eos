import LS2Request from '@enact/webos/LS2Request';

function set_alarm (time) {
	console.log("En set_alarm time es: " + time)
	return {
		type: 'SET_ALARM_TIME',
		time
	};
}

function create_alarm(res) {
	console.log("En create_alarm res es: ")
	console.log(res)
	return{
		type: 'CREATE_ALARM_TIME',
		payload: res
	};
}

export const alarm_set = params => dispatch => {
	console.log("En alar_set params es:")
	console.log(params.params)
	dispatch(set_alarm(params.at));
	return new LS2Request().send({
		service: 'luna://com.webos.service.alarm',
		method: 'set',
		parameters: params.params,
		onSuccess: (res) => {
			console.log("He tenido exito")
			console.log(res)
			// dispatches action on success callback with payload
			dispatch(create_alarm(res));
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

//////////////////////////////////////////////////////////////////////////////

export const notification_createAlert = params => dispatch => {
	console.log("entro en el notification")
	// possible to dispatch an action at the start of fetching
	// dispatch({type: 'FETCH_SYSETEM_SETTINGS'});

	dispatch()
	return new LS2Request().send({
		service: 'com.webos.notification',
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

function close_notification (res) {
	return {
		type: 'CLOSE_NOTIFICATION',
		payload: res
	};
}