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
	database: process.env.DB_DATABASE
});

connection.connect();

app.set('secret', process.env.JWT_SECRET);

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
  const dbQuery = `SELECT * FROM usersSettings WHERE id = '${userID}'`;

  connection.query(dbQuery, (err, results) => {
    res.send(results);
  });

});

app.get('/get/accounts/:id_token', (req, res) => {
  const userID = parseUserID(req.params.id_token);
  const dbQuery = `SELECT * FROM accounts WHERE userID = '${userID}'`;

  connection.query(dbQuery, (err, results) => {
    res.send(results);
  });

});

app.get('/get/accounts/info', (req, res) => {
  console.log(req.body);
});

app.post('/post/user', (req, res) => {
  const userID = parseUserID(req.body.tokenID);
  const dbQuery = `
    UPDATE usersSettings 
    SET name = '${req.body.user.name}',
      lastname = '${req.body.user.lastname}',
      email = '${req.body.user.email}',
      birthDate = '${req.body.user.birthDate}',
      nickname = '${req.body.user.nickname}',
      gender = '${req.body.user.gender}'
    WHERE id = '${userID}'`;

  connection.query(dbQuery, (err, results) => {
    res.sendStatus(200);
  });
  
});

app.post('/post/accounts/add', (req, res) => {
  const userID = parseUserID(req.body.tokenID);
  const dbQuery = `
    INSERT INTO accounts
    SET id = '${uuid.v4()}',
      userID = '${userID}',
      name = '${req.body.account.name}',
      balance = '${req.body.account.balance}',
      defaultCurrency = '${req.body.account.defaultCurrency}',
      color = '${req.body.account.color}'`;
  
  connection.query(dbQuery, (err, results) => {
    res.sendStatus(200);
  });

});

app.post('/post/accounts/update', (req, res) => {
  const dbQuery = `
    UPDATE accounts
    SET balance = '${req.body.balance}',
      defaultCurrency = '${req.body.currency}'
    WHERE id = '${req.body.id}'`;

  connection.query(dbQuery, (err, results) => {
    res.sendStatus(200);
  });

});


app.listen(6060, () => console.log('Listening on port 6060'));