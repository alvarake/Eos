const Service = require('webos-service');

const axios = require('axios');

const pkgInfo = require('./package.json');

const service = new Service(pkgInfo.name);

const secrets = require('./secrets.json');

const login = () => {
	const url = `https://openapi.emtmadrid.es/v1/mobilitylabs/user/login/`;
	const options = { headers: secrets };

	return axios.get(url, options).then((response) => {
		// handle success
		const { accessToken } = response.data.data[0];
		return Promise.resolve(accessToken);
	})
};

service.register('stopdetail', (message) => {
	const stopid = message.payload.stopid;
	let accessToken = message.payload.accessToken;
	let nextStep = new Promise(resolve =>{resolve(accessToken)});
	if (!accessToken){
		nextStep = login();
	}
	nextStep.then(accessToken => {
	const url = `https://openapi.emtmadrid.es/v1/transport/busemtmad/stops/${stopid}/detail/`;
	const options = { headers: { accessToken } };
	
	axios.get(url, options).then((response) => {
		// handle success
		message.respond({
			returnValue: true,
			message: 'Conseguidos los datos',
			stopid,
			accessToken,
			description: response.data.description,
			data: response.data.data[0],
		});
	})
		.catch((error) => {
			// handle error
			message.respond({
				returnValue: false,
				message: 'Problema al conseguir los datos de la parada de autobus',
				stopid,
				error,
			});
		});
	})
});

service.register('arrivalbus', (message) => {
	const url = `https://openapi.emtmadrid.es/v1/transport/busemtmad/stops/${message.payload.stopid}/arrives/`;
	const options = {
		headers: {
			accessToken: message.payload.accessToken,
		},
		data: {
			cultureInfo: 'ES',
			Text_StopRequired_YN: 'Y',
			Text_EstimationsRequired_YN: 'Y',
			Text_IncidencesRequired_YN: 'Y',
			DateTime_Referenced_Incidencies_YYYYMMDD: 'Aqui hay que poner el día de hoy',
		},
	};
	axios.post(url, options).then((response) => {
		// handle success
		message.respond({
			returnValue: true,
			message: 'Conseguidos los datos',
			stopid: message.payload.stopid,
			description: response.data.description,
			data: response.data.data[0],
		});
	})
		.catch((error) => {
			// handle error
			message.respond({
				returnValue: false,
				message: 'Problema al conseguir los datos de ',
				stopid: message.payload.stopid,
				error,
			});
		});
}); 
