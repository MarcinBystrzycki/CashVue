const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const app = express();

dotenv.config();

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
	database: process.env.DB_DATABASE,
  connectTimeout: 5000,
  ssl: 'Amazon RDS',

});

connection.connect();

// app.use(express.static('./frontend/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get(['/', '/callback'], function(req, res) {
// 	res.sendFile('/frontend/dist/index.html', {root: '.'});
// });

const whitelist = [process.env.DB_WHITELISTED_ORIGIN];

const corsOptions = {
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'X-Requested-With'],
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

const parseUserID = (idToken) => {
  if (jwt.decode(idToken).sub) {
    return jwt.decode(idToken).sub.replace('auth0|', '');  
  } else {
    return null;
  }
  
};

app.use(cors(corsOptions));

app.get('/get/users/:id_token', (req, res) => {
  const userID = parseUserID(req.params.id_token);
  const dbQuery = `SELECT * FROM usersSettings WHERE id = ${connection.escape(userID)}`;

  connection.query(dbQuery, (err, results) => {
    res.send(results);
  });

});

app.get('/get/accounts/:id_token', (req, res) => {
  const userID = parseUserID(req.params.id_token);
  const dbQuery = `SELECT * FROM accounts WHERE userID = ${connection.escape(userID)}`;

  connection.query(dbQuery, (err, results) => {
    res.send(results);
  });

});

app.get('/get/accounts/info/:id', (req, res) => {
  const dbQuery = `SELECT * FROM settlements WHERE accountID = ${connection.escape(req.params.id)}`;
  connection.query(dbQuery, (err, results) => {
    res.send(results);
  });
});

app.post('/post/user', (req, res) => {
  const userID = parseUserID(req.body.tokenID);
  const dbQuery = `
    UPDATE usersSettings 
    SET name = ${connection.escape(req.body.user.name)},
      lastname = ${connection.escape(req.body.user.lastname)},
      email = ${connection.escape(req.body.user.email)},
      birthDate = ${connection.escape(req.body.user.birthDate)},
      nickname = ${connection.escape(req.body.user.nickname)},
      gender = ${connection.escape(req.body.user.gender)}
    WHERE id = ${connection.escape(userID)}`;

  connection.query(dbQuery, (err, results) => {
    res.sendStatus(200);
  });
  
});

app.post('/post/accounts/add', (req, res) => {
  const userID = parseUserID(req.body.tokenID);
  const dbQuery = `
    INSERT INTO accounts
    SET id = ${connection.escape(uuid.v4())},
      userID = ${connection.escape(userID)},
      name = ${connection.escape(req.body.account.name)},
      initialBalance = ${connection.escape(req.body.account.initialBalance)},
      actualBalance = ${connection.escape(req.body.account.initialBalance)},
      defaultCurrency = ${connection.escape(req.body.account.defaultCurrency)},
      color = ${connection.escape(req.body.account.color)}`;
  
  connection.query(dbQuery, (err, results) => {
    res.sendStatus(200);
  });

});

app.post('/post/accounts/update', (req, res) => {
  const dbQuery = `
    UPDATE accounts
    SET actualBalance = ${connection.escape(req.body.actualBalance)},
      defaultCurrency = ${connection.escape(req.body.currency)}
    WHERE id = ${connection.escape(req.body.id)}`;

  connection.query(dbQuery, (err, results) => {
    res.sendStatus(200);
  });

});

app.post('/post/settlements/add', (req, res) => {
  const dbQuery = `
    INSERT INTO settlements
    SET id = ${connection.escape(uuid.v4())},
      name = ${connection.escape(req.body.name)},
      accountID = ${connection.escape(req.body.accountID)},
      type = ${connection.escape(req.body.type)},
      amount = ${connection.escape(req.body.amount)},
      category = ${connection.escape(req.body.category)},
      time = ${connection.escape(req.body.time)},
      place = ${connection.escape(req.body.place)}`;

  connection.query(dbQuery, (err, results) => {
    res.sendStatus(200);
  });

});

app.post('/post/settlements/update', (req, res) => {
  const dbQuery = `
    UPDATE settlements
    SET amount = ${connection.escape(req.body.amount)},
      category = ${connection.escape(req.body.category)},
      time = ${connection.escape(req.body.time)},
      place = ${connection.escape(req.body.place)}
    WHERE id = ${connection.escape(req.body.id)}`;

  connection.query(dbQuery, (err, results) => {
    res.sendStatus(200);
  });

});

app.delete('/delete/settlements/:id', (req, res) => {
  const dbQuery = `
    DELETE FROM settlements
    WHERE id = ${connection.escape(req.params.id)}`;

  connection.query(dbQuery, (err, results) => {
    res.sendStatus(200);
  });

});

app.listen(6060, () => console.log('Listening on port 6060'));