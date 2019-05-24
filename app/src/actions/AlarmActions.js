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


const time_to_Alert = (hora_dispositivo, hora_alarma) => {


	let minutos_dispositivo = parseInt(hora_dispositivo.hour)*60 + parseInt(hora_dispositivo.minute)
	let alarm_time_min = hora_alarma.split(":");
	alarm_time_min = parseInt(alarm_time_min[0])*60 + parseInt(alarm_time_min[1]);

	let differencia_en_minutos =alarm_time_min-minutos_dispositivo;

	if (differencia_en_minutos <0){
		differencia_en_minutos= differencia_en_minutos+24*60;
	}

	let horas_para_la_alarma = Math.trunc(differencia_en_minutos/60)

	if (horas_para_la_alarma <10) {
		horas_para_la_alarma = 0 + horas_para_la_alarma.toString()
	}
	let minutos_para_alarma= differencia_en_minutos%60;

	if (minutos_para_alarma <10) {
		minutos_para_alarma = 0 + minutos_para_alarma.toString()
	}
	let resultado_final = horas_para_la_alarma.toString() +':'+ minutos_para_alarma.toString()+":00"
	return resultado_final;

};

const set_alarm_device = (params) => dispatch => {
	console.log("Entramos en set_alarm_device");

	let dia_de_hoy = params.res.localtime.hour + ":" + params.res.localtime.minute;
	dispatch(set_timestamp_alarm(dia_de_hoy));
	console.log("pppppppp")
	console.log("params.alarmtime.ev")
	console.log("pppppppp")
	console.log("music")

	let in_time = time_to_Alert(params.res.localtime, params.alarmtime.ev);

	let a = new LS2Request().send({
		service: 'luna://com.webos.service.alarm',
		method: 'set',
		parameters: {
			in:in_time,
			key:"toast_alarm",
			uri:"luna://com.webos.notification/createToast",
			wakeup:true,
			params:{
				message: "¡A quién madruga eOS ayuda!",
				onclick: {appId:"eos"},
				sourceId:"eos"
			}
		},
		onSuccess: (res) => {
			console.log("Se ha creado el TOAST_ALERT")
			console.log(res)
			dispatch(alarm_configured(true));
		},
		onFailure: (res) => {
			console.log("Se ha FALLADO al  crear el TOAST_ALERT")
			console.log(res);
			dispatch(alarm_configured(false));
		}
	});
	let b ="";
	let mediaId =params.alarmtime.music.sound;
	if (mediaId) {
		b = new LS2Request().send({
			service: 'luna://com.webos.service.alarm',
			method: 'set',
			parameters: {
				in:in_time,
				key:"music_alarm",
				uri:"luna://com.webos.media/play",
				wakeup:true,
				params:{
					mediaId : mediaId
				},
			},
			onSuccess: (res) => {
				console.log("Se ha creado el MUSIC_ALERT")
				console.log(res)
			},
			onFailure: (res) => {
				console.log("Se ha FALLADO al crear el MUSIC_ALERT")
				console.log(res);
			}
		});
	}

	return {a,b};


};


export const clock_time = (alarmtime) => dispatch => {
	console.log("Entramos en clock")

	dispatch(set_alarm(alarmtime.ev));

	return new LS2Request().send({
		service: 'luna://com.webos.service.systemservice',
		method: 'time/getSystemTime',
		onSuccess: (res) => {
			console.log(res)
			dispatch(set_alarm_device({res,alarmtime}));
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