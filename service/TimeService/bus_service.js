const Service = require('webos-service');

const pkgInfo = require('./package.json');

const service = new Service(pkgInfo.name);

const timeService = service.register('time');

const subscriptions = {};
let interval;

timeService.on('request', (message) => {
	if (message.isSubscription) {
		subscriptions[message.uniqueToken] = message;

		if (!interval) {
			interval = setInterval(() => {
				for (let subscriber in subscriptions) {
					subscriptions[subscriber].respond({
						datetime: new Date().toISOString(),
					});
				}
			}, 1000);
		}
	}
});

timeService.on('cancel', (message) {
	delete subscriptions[message.uniqueToken];

	var keys = Object.keys(subscriptions);
	if (keys.length === 0) {
		console.log("no more subscriptions, canceling interval");
		clearInterval(interval);
		interval = undefined;
	}
});
