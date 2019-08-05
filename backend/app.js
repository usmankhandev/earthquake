const express = require('express');
const mysql = require('mysql');

const PORT = process.env.PORT || 5000;
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: null,
	database: 'earthquakedb',
});

connection.connect(function(err) {
	if (err) {
		console.log(err);
	}
});

// Api Routes

app.get('/', function(req, res) {
	let query = `SELECT id, magnitude, place, time, longitude, lattitude
	FROM earthquake
	ORDER BY magnitude DESC
	LIMIT 2`;
	connection.query(query, (err, data) => {
		if (err) {
			res.send(err);
		} else {
			res.send(data);
		}
	});
});

// Post Data into dataase.
app.post('/earthquake/save', function(req, res) {
	// let user = req.body.user;
	const { id, magnitude, place, time, longitude, lattitude } = req.query;
	// if (!user) {
	//   return res.status(400).send({ error:true, message: 'Please provide user' });
	// }
	let query = `Insert into earthquake(id, magnitude, place, time, longitude, lattitude)
    values('${id}', '${magnitude}', '${place}', '${time}', '${longitude}','${lattitude}')`;
	connection.query(query, function(error, results) {
		if (error) throw error;
		return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
	});
});

// Edit the Data

// app.put('/earthquake/edit', function(req, res) {
// 	let earthquake_id = req.body.id;
// 	// let user = req.body.user;
// 	const { id, magnitude, place, time, longitude, lattitude } = req.query;
// 	// if (!user_id || !user) {
// 	// 	return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
// 	// }
// 	dbConn.query(
// 		'UPDATE earthquake SET id = ?, magnitude = ?, place = ?, time = ?, longitude = ?, lattitude = ?, WHERE id = ?',
// 		[req.query, earthquake_id],
// 		function(error, results) {
// 			if (error) throw error;
// 			return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
// 		}
// 	);
// });

app.put('/earthquake/save', function(req, res) {
	const { id, magnitude, place, time, longitude, lattitude } = req.query;
	query =
		'UPDATE earthquake SET id = '${id}', `magnitude`=${magnitude},`place`=${place}, `time`=${time}, `longitude`=${longitude}, `lattitude`=${lattitude} where `id`=${id}';
	connection.query(query, function(error, results) {
		if (error) throw error;
		res.end(JSON.stringify(results));
	});
});

app.listen(PORT, () => {
	console.log(`App is running on ${PORT}`);
});
