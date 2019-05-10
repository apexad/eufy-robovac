let lib = require('./dist/index');

const RoboVac = lib.RoboVac;

if(process.argv.length !== 5) {
	console.error("You must pass at least 3 params:");
	console.log("npm run demo <deviceId | ipAddress> <localKey> <command>");
	console.log("");
	console.log("Available Commands:");
	console.log("status - Prints current statuses");
	console.log("quickTest - Runs your vacuum for 10 seconds then returns to base");
	process.exit(0);
}

(async () => {
	let config = {
		localKey: process.argv[3]
	};

	// Hacky ip check, if device id's ever have periods in them this could be an issue
	if(process.argv[2].indexOf('.') !== -1) {
		config.ip = process.argv[2];
	} else {
		config.deviceId = process.argv[2];
	}

	try {
		let r = new RoboVac(config);
		if(process.argv[4] === 'status') {
			await r.getStatuses();
			r.formatStatus();
			await r.disconnect();
		} else if(process.argv[4] === 'quickTest') {
			await r.getStatuses();
			r.formatStatus();
			console.log("Demo: startCleaning");
			await r.startCleaning();
			await sleep(10000);
			console.log("Demo: pause");
			await r.pause();
			await sleep(1000);
			console.log("Demo: goHome");
			await r.goHome();
			await sleep(2000);
			await r.disconnect();
		} else {
			console.error("Unknown command: " + process.argv[4]);
			process.exit(0);
		}
	} catch (error) {
		console.error("ERROR: " + JSON.stringify(error));
	}
})();

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
