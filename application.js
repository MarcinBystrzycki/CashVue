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

const knex = require('knex')({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		port: process.env.DB_PORT,
		database: process.env.DB_DATABASE,
	}
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
	knex.select().from('usersSettings').where({ id: parseUserID(req.params.id_token) })
		.then((result) => {
			res.send(result);
		})
		.catch((error) => {
			console.log('Get user exception:', error);
		});

});

app.get('/get/accounts/:id_token', (req, res) => {
	const userID = parseUserID(req.params.id_token);

	knex.select().from('accounts').where({ userID })
		.then((accounts) => {
			knex.select().from('notes').where({ userID })
				.then((notes) => {
					res.send({
						accounts,
						notes
					});
				});
		})
		.catch((error) => {
			console.log('Get accounts exception:', error);
		});

});

app.get('/get/accounts/info/:id', (req, res) => {

	knex.select().from('settlements').where({ accountID: req.params.id })
		.then((results) => {
			res.send(results);
		})
		.catch((error) => {
			console.log('Get account info exception:', error);
		});

});

app.post('/post/user', (req, res) => {

	knex('usersSettings')
		.where({ id: parseUserID(req.body.tokenID) })
		.update({
			name: req.body.user.name,
			lastname: req.body.user.lastname,
			email: req.body.user.email,
			birthDate: req.body.user.birthDate,
			nickname: req.body.user.nickname,
			gender: req.body.user.gender
		})
		.then((results) => {
			res.sendStatus(200);
		})
		.catch((error) => {
			console.log('Update user profile exception:', error);
		});
	  
});

app.post('/post/accounts/add', (req, res) => {

	knex('accounts')
		.insert({
			id: uuid.v4(),
			userID: parseUserID(req.body.tokenID),
			name: req.body.account.name,
			initialBalance: req.body.account.initialBalance,
			actualBalance: req.body.account.initialBalance,
			defaultCurrency: req.body.account.defaultCurrency,
			color: req.body.account.color
		})
		.then((results) => {
			res.sendStatus(200);
		})
		.catch((error) => {
			console.log('Add account exception:', error);
		});

});

app.post('/post/accounts/update', (req, res) => {

	knex('accounts')
		.where({ id: req.body.id })
		.update({
			actualBalance: req.body.actualBalance,
			defaultCurrency: req.body.currency
		})
		.then((results) => {
			res.sendStatus(200);
		})
		.catch((error) => {
			console.log('Update account exception:', error);
		});

});

app.post('/post/settlements/add', (req, res) => {

	knex('settlements')
		.insert({
			id: uuid.v4(),
			name: req.body.name,
			accountID: req.body.accountID,
			type: req.body.type,
			amount: req.body.amount,
			category: req.body.category,
			time: req.body.time,
			place: req.body.place
		})
		.then((results) => {

			if (req.body.type === 'expense') {
				knex('accounts')
					.where({ id: req.body.accountID })
					.decrement('actualBalance', req.body.amount)
					.then(() => {
						res.sendStatus(200);
					});
			} else {
				knex('accounts')
					.where({ id: req.body.accountID })
					.increment('actualBalance', req.body.amount)
					.then(() => {
						res.sendStatus(200);
					});
			}

		})
		.catch((error) => {
			console.log('Add setllement exception:', error);
		});

});

app.post('/post/settlements/update', (req, res) => {
	let actualAmount, accountID, type;

	knex.select()
		.from('settlements')
		.where({ id: req.body.id })
		.then((results) => {
			actualAmount = results[0].amount || 0;
			accountID = results[0].accountID || '';
			type = results[0].type || '';

			if (req.body.amount > actualAmount) {
				const difference = (req.body.amount - actualAmount).toFixed(2);

				if (type === 'expense') {
					knex('accounts')
						.where({ id: accountID })
						.decrement('actualBalance', difference)
						.then(() => {

							knex('settlements')
								.where({ id: req.body.id })
								.update({
									amount: req.body.amount,
									category: req.body.category,
									time: req.body.time,
									place: req.body.place
								})
								.then(() => {
									res.sendStatus(200);
								})
								.catch((error) => {
									console.log('Update settlement exception 1:', error);
								});
						})
						.catch((error) => {
							console.log('Update settlement exception 2:', error);
						});

				} else if (type === 'earning') {
					
					knex('accounts')
						.where({ id: accountID })
						.increment('actualBalance', difference)
						.then(() => {

							knex('settlements')
								.where({ id: req.body.id })
								.update({
									amount: req.body.amount,
									category: req.body.category,
									time: req.body.time,
									place: req.body.place
								})
								.then(() => {
									res.sendStatus(200);
								})
								.catch((error) => {
									console.log('Update settlement exception 3:', error);
								});

						})
						.catch((error) => {
							console.log('Update settlement exception 4:', error);
						});

				}
			} else if (req.body.amount <= actualAmount) {
				const difference = (actualAmount - req.body.amount).toFixed(2);

				if (type === 'expense') {

					knex('accounts')
						.where({ id: accountID })
						.increment('actualBalance', difference)
						.then(() => {

							knex('settlements')
								.where({ id: req.body.id })
								.update({
									amount: req.body.amount,
									category: req.body.category,
									time: req.body.time,
									place: req.body.place
								})
								.then(() => {
									res.sendStatus(200)
								})
								.catch((error) => {
									console.log('Update settlement exception 5:', error);
								});
						})
						.catch((error) => {
							console.log('Update settlement exception 6:', error);
						});

				} else if (type === 'earning') {

					knex('accounts')
						.where({ id: accountID })
						.decrement('actualBalance', difference)
						.then(() => {

							knex('settlements')
								.where({ id: req.body.id })
								.update({
									amount: req.body.amount,
									category: req.body.category,
									time: req.body.time,
									place: req.body.place
								})
								.then(() => {
									res.sendStatus(200)
								})
								.catch((error) => {
									console.log('Update settlement exception 7:', error);
								});
						})
						.catch((error) => {
							console.log('Update settlement exception 8:', error);
						});
				}
			}
		})

});

app.delete('/delete/settlements/:id', (req, res) => {
  let amount, accountID, type;

	knex.select()
		.from('settlements')
		.where({ id: req.params.id })
		.then((results) => {
			amount = results[0].amount || 0;
			accountID = results[0].accountID || '';
			type = results[0].type || '';

			knex('settlements')
				.where({ id: req.params.id })
				.del()
				.then(() => {

					if (type === 'earning') {
					knex('accounts')
						.where({ id: accountID })
						.decrement('actualBalance', amount)
						.then(() => {
							res.sendStatus(200);
						});
					} else {
					knex('accounts')
						.where({ id: accountID })
						.increment('actualBalance', amount)
						.then(() => {
							res.sendStatus(200);
						});
					}

				});
		})

});

app.listen(6060, () => console.log('Listening on port 6060'));
