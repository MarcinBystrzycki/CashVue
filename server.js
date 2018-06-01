const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mysql = require('mysql');
const express = require('express');
const app = express();

dotenv.config();

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
	database: process.env.DB_DATABASE
});

connection.connect();

// app.use(express.static('./frontend/dist'));
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get(['/', '/callback'], function(req, res) {
// 	res.sendFile('/frontend/dist/index.html', {root: '.'});
// });

app.get('/get/:userID', (req, res) => {
	const userID = req.params.userID;
	const dbQuery = `SELECT * FROM usersSettings WHERE id = '${userID}'`;

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	
	connection.query(dbQuery, (err, results) => {
		res.send(results);
	});
});

app.listen(6060, () => console.log('Listening on port 6060'));