const fs = require("fs");
const prompt = require("inquirer").createPromptModule();

console.log("Retrieving students directory...");
console.log("");

fs.readdir("./students", function(err, files) {
	if (err) {
		console.error("Unable to read students");
		console.error(err);
		process.exit(1);
	}

	// Get an array of capitalized firstnames
	const nameMap = files.map(function(file) {
		const name = file.split(".")[0];
		return {
			name: name.charAt(0).toUpperCase() + name.slice(1),
			file: name,
		};
	});

	// Present a choice
	prompt({
		type: "list",
		name: "choice",
		message: "Whose info do you want to see?",
		choices: nameMap,
	}).then(function(res) {
		const choice = res.choice;
		let file = nameMap.reduce(function(prev, option) {
			if (option.name === choice) {
				return option.file;
			}

			return prev;
		}, null);

		try {
			data = require("./students/" + file);
			console.log("Printing out data for " + choice + "...");
			console.log("========================================");
			console.log("");
			console.log(JSON.stringify(data, null, 2));
		}
		catch(err) {
			console.error("Improperly formatted or missing student file, printing error:");
			console.error(err);
		}
	});
});
