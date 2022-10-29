const fs = require('fs');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
	// Empty file if there is old data
	fs.writeFileSync('./output.txt', '');
	//  Check if there are errors
	if (err) {
		console.error(err);
		return;
	}
	// Create key value pairs. Key for bidder and value for amount
	let obj = {};
	data.split('\n').map((line) => {
		obj[line.split(',')[0]] = parseInt(line.split(',')[1]);
	});
	const items = obj['Items'];
	delete obj.Items;

	// If the object has an empty key then there are no bidders, then No Winners is in the output file
	if (Object.keys(obj).includes('')) {
		fs.appendFileSync('./output.txt', 'No Winners');
	} else {
		const arr = Object.entries(obj).sort(([, a], [, b]) => b - a);
		for (let i = 0; i < arr.length; i++) {
			if (i !== items) {
				arr[i][1] = arr[i + 1][1];
			} else {
				arr[i][1] = 'Lost';
			}
			fs.appendFileSync('./output.txt', arr[i][0] + ',' + arr[i][1] + '\n');
		}
	}
});
