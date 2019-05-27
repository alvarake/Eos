const Service = require('webos-service');

const axios = require('axios');

const pkgInfo = require('./package.json');

const service = new Service(pkgInfo.name);

const secrets = require('./secrets.json');

service.register('login', (message) => {
	axios.get('https://openapi.emtmadrid.es/v1/mobilitylabs/user/login/', { headers: secrets }).then((response) => {
		// handle success
		const { accessToken } = response.data.data[0];
		message.respond({
			returnValue: true,
			message: 'Registrado',
			accessToken,
		});
	})
		.catch((error) => {
			// handle error
			message.respond({
				returnValue: false,
				message: 'Problema Registro',
				error,
			});
		});
});

service.register('stopdetail', (message) => {
	const url = `https://openapi.emtmadrid.es/v1/transport/busemtmad/stops/${message.payload.stopid}/detail/`;
	axios.get(url, { headers: { accessToken: message.payload.accessToken } }).then((response) => {
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
				message: 'Problema al conseguir los datos de la parada de autobus',
				stopid: message.payload.stopid,
				error,
			});
		});
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
