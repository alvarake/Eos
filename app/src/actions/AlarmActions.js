import LS2Request from '@enact/webos/LS2Request';

const setAlarm = alarmtime => ({
	type: 'SET_ALARM_TIME',
	alarmtime,
});

const setAlarmTimesStamp = alarmtimestamp => ({
	type: 'TIME_ALARM_WAS_CREATED',
	alarmtimestamp,
});

const deleteAlarm = alarmtime => ({
	type: 'DELETE_ALARM_TIME',
	alarmtime,
});

export const addPossibleAlarm = possibleAlarm => ({
	type: 'POSSIBLE_ALARM_WAS_SELECTED',
	possibleAlarm,
});


const calculateTimeToAlert = (deviceTime, alarmTime) => {
	const deviceTimeInMins = parseInt(deviceTime.hour, 10) * 60 + parseInt(deviceTime.minute, 10);
	const alarmTimeInMins = parseInt(alarmTime.split(':')[0], 10) * 60 + parseInt(alarmTime.split(':')[1], 10);
	let totalMinsToAlert = alarmTimeInMins - deviceTimeInMins;

	if (totalMinsToAlert < 0) {
		totalMinsToAlert += 24 * 60;
	}

	let hoursToAlarm = Math.trunc(totalMinsToAlert / 60);

	if (hoursToAlarm < 10) {
		hoursToAlarm = 0 + hoursToAlarm.toString();
	}
	let minsToAlert = totalMinsToAlert % 60;

	if (minsToAlert < 10) {
		minsToAlert = 0 + minsToAlert.toString();
	}
	const finalResult = `${hoursToAlarm.toString()}:${minsToAlert.toString()}:00`;
	return finalResult;
};

const setDeviceAlarm = params => (dispatch) => {
	console.log('Entramos en setDeviceAlarm');
	const deviceTime = `${params.res.localtime.hour}:${params.res.localtime.minute}`;
	dispatch(setAlarmTimesStamp(deviceTime));

	const timeToAlert = calculateTimeToAlert(params.res.localtime, params.alarmSelected);
	let a = '';
	let b = '';
	const mediaId = params.music.mediaid;

	if (mediaId) {
		a = new LS2Request().send({
			service: 'luna://com.webos.service.alarm',
			method: 'set',
			parameters: {
				in: timeToAlert,
				key: `${params.alarmSelected} Toast`,
				uri: 'luna://com.webos.notification/createToast',
				wakeup: true,
				params: {
					message: '¡A quién madruga eOS ayuda!',
					onclick: { appId: 'eos' },
					sourceId: 'eos',
				},
			},
			onSuccess: (res) => {
				console.log('Se ha creado el TOAST_ALERT');
				console.log(res);
			},
			onFailure: (res) => {
				console.log('Se ha FALLADO al  crear el TOAST_ALERT');
				console.log(res);
			},
		});

		b = new LS2Request().send({
			service: 'luna://com.webos.service.alarm',
			method: 'set',
			parameters: {
				in: timeToAlert,
				key: `${params.alarmSelected} Music`,
				uri: 'luna://com.webos.media/play',
				wakeup: true,
				params: {
					mediaId,
				},
			},
			onSuccess: (res) => {
				console.log('Se ha creado el MUSIC_ALERT');
				console.log(res);
			},
			onFailure: (res) => {
				console.log('Se ha FALLADO al crear el MUSIC_ALERT');
				console.log(res);
			},
		});
	} else {
		console.log('Primero debes elegir una canción');
	}
	return { a, b };
};


export const calculateDeviceTime = alarmConfig => (dispatch) => {
	console.log('Entramos en calculateDeviceTime');
	console.log(alarmConfig);

	const alarmSelected = alarmConfig.alarm.possibleAlarms.pop();
	dispatch(setAlarm(alarmSelected));

	return new LS2Request().send({
		service: 'luna://com.webos.service.systemservice',
		method: 'time/getSystemTime',
		onSuccess: (res) => {
			console.log(res);
			dispatch(setDeviceAlarm({ res, alarmSelected, music: alarmConfig.music }));
		},
		onFailure: (res) => {
			console.log(res);
		},
	});
};


export default calculateDeviceTime;
