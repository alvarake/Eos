import LS2Request from '@enact/webos/LS2Request';

const set_alarm = (alarmtime) => {
	return {
		type: 'SET_ALARM_TIME',
		alarmtime
	};
};

const set_timestamp_alarm = (alarmtimestamp) => {
	return {
		type: 'TIME_ALARM_WAS_CREATED',
		alarmtimestamp
	};
};

const alarm_configured = (configured) => {
	return {
		type: 'ALARM_CONFIGURED',
		configured
	};
};


const set_alarm_device = (params) => dispatch => {
	console.log("Entramos en set_alarm_device")
	console.log(params.localtime)
	let dia_de_hoy = params.localtime.day + "/" + params.localtime.month;
	dispatch(set_timestamp_alarm(dia_de_hoy));

	return new LS2Request().send({
		service: 'luna://com.webos.service.alarm',
		method: 'set',
		parameters: {
			in:"00:00:10",
			key:"test_alarm",
			uri:"luna://com.webos.notification/createAlert",
			wakeup:true,
			params:{
				message: "¡A quién madruga eOS ayuda!",
				buttons:[{label:"launch",onclick:"luna://com.webos.applicationManager/launch",params:{id:"eos"}}]
			}
		},
		onSuccess: (res) => {
			console.log("He tenido exito")
			console.log(res)
			dispatch(alarm_configured(true));
		},
		onFailure: (res) => {
			console.log("Has fallado en hacer la comunicacion")
			console.log(res);
			dispatch(alarm_configured(false));
		}
	});
};



export const clock_time = (alarmtime) => dispatch => {
	console.log("Entramos en clock")

	dispatch(set_alarm(alarmtime));

	return new LS2Request().send({
		service: 'luna://com.webos.service.systemservice',
		method: 'time/getSystemTime',
		onSuccess: (res) => {
			console.log(res)
			dispatch(set_alarm_device(res));
		},
		onFailure: (res) => {
			console.log(res);
		}
	});
};

//////////////////////////////////////////////////////////////////////////////

export const notification_createToast = params => dispatch => {
	console.log("entro en el notification")
	// possible to dispatch an action at the start of fetching
	// dispatch({type: 'FETCH_SYSETEM_SETTINGS'});

	return new LS2Request().send({
		service: 'luna://com.webos.notification/',
		method: 'createToast',
		parameters: params,
		onSuccess: (res) => {
			console.log("Has tenido exito en hacer la comunicacion")
			console.log(res)
			// dispatches action on success callback with payload
			dispatch(set_notification_state(res));
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

function set_notification_state(res) {
	console.log("Res : ")
	console.log(res)
	return {
		type: 'SET_NOTIFICATION',
		payload: res
	};
};

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
	};