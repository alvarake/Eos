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
	
	if (!accessToken) {
		nextStep = login();
	}
	nextStep.then(accessToken => {
		const url = `https://openapi.emtmadrid.es/v1/transport/busemtmad/stops/${stopid}/detail/`;
		const options = { headers: { accessToken } };
		
		axios.get(url, options).then((response) => {
			// handle success
			message.respond({
				returnValue: true,
				description: response.data.description,
				data: response.data.data[0].stops[0],
				accessToken,
			});
		})
		.catch((error) => {
			// handle error
			message.respond({
				returnValue: false,
				stopid,
				error,
			});
		});
	})
});

service.register('arrivalbus', (message) => {
	const stopid = message.payload.stopid;
	const accessToken = message.payload.accessToken;
	const url = `https://openapi.emtmadrid.es/v1/transport/busemtmad/stops/${stopid}/arrives/`;
	const options = {
		headers: {
			accessToken,
			'Content-Type': 'application/json',
		},
	};
	const data = {
		cultureInfo: 'ES',
		Text_StopRequired_YN: 'Y',
		Text_EstimationsRequired_YN: 'Y',
		Text_IncidencesRequired_YN: 'Y',
		DateTime_Referenced_Incidencies_YYYYMMDD: '20190528',
	};
	
	axios.post(url, data, options).then((response) => {
		// handle success
		message.respond({
			returnValue: true,
			stopid,
			description: response.data.description,
			data: response.data.data[0].Arrive,
			lineasParada: response.data.data[1].StopLines,
			
		});
	})
	.catch((error) => {
		// handle error
		message.respond({
			returnValue: false,
			message: 'Problema al conseguir los datos de ',
			stopid,
			error,
		});
	});
}); 
