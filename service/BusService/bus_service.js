const Service = require('webos-service');

const axios = require('axios');

const pkgInfo = require('./package.json');

const service = new Service(pkgInfo.name);

const secrets = require('./secrets.json');

const login = () => {
	const url = `https://openapi.emtmadrid.es/v1/mobilitylabs/user/login/`;
	const options = { headers: secrets };
	return axios.get(url, options).then((response) => {
		const { accessToken } = response.data.data[0];
		return Promise.resolve(accessToken);
	})
};

service.register('stopdetail', (message) => {
	const stopid = message.payload.stopid;
	let accessToken = message.payload.accessToken;
	let nextStep = new Promise(resolve =>{resolve(accessToken)});

	if (!accessToken) {nextStep = login();};
	nextStep.then(accessToken => {
		const url = `https://openapi.emtmadrid.es/v1/transport/busemtmad/stops/${stopid}/detail/`;
		const options = { headers: { accessToken } };
		axios.get(url, options).then((response) => {
			let stopsInfo = response.data.data[0].stops[0];
			// handle success
			message.respond({
				returnValue: true,
				description: response.data.description,
				stopsInfo, 
				accessToken,
			});
		})
		.catch((error) => {
			// handle error
			message.respond({
				returnValue: false,
				error,
			});
		});
	})
});

const arrivalBus = service.register("arrivalbus");
let interval;
let subscriptions = {};

function createInterval(message) {
	if (interval) {
		return;
	}
	console.log("create new interval");
	interval = setInterval(function() {
		sendResponses(message);
	}, 20000);
}

function sendResponses(message) {
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
		DateTime_Referenced_Incidencies_YYYYMMDD: '20190529',
	};
	for (var i in subscriptions) {
		if (subscriptions.hasOwnProperty(i)) {
			var s = subscriptions[i];
			axios.post(url, data, options).then((response) => {
				let StopLines = response.data.data[1].StopLines.Data;
				if (!Array.isArray(StopLines)) {
					StopLines = new Array(StopLines);
				}
				// handle success
				s.respond({
					returnValue: true,
					stopid,
					description: response.data.description,
					Arrive: response.data.data[0].Arrive,
					StopLines,
					nombreParada: response.data.data[1].Description,
					datetime: response.data.datetime,
					
				});
			})
			.catch((error) => {
				// handle error
				s.respond({
					returnValue: false,
					message: 'Se rompe en arrivalBUS',
					stopid,
					error,
				});
			});
		}
	}
}

arrivalBus.on('request', (message) => {

	if (message.isSubscription) {
		subscriptions[message.uniqueToken] = message;
		if (!interval) {
			createInterval(message);
		}
	}
}); 

arrivalBus.on("cancel", function(message) {
	console.log("Canceled " + message.uniqueToken);
	delete subscriptions[message.uniqueToken];
	var keys = Object.keys(subscriptions);
	if (keys.length === 0) {
		console.log("no more subscriptions, canceling interval");
		clearInterval(interval);
		interval = undefined;
	}
});
