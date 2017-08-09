'use strict';

const express = require('express');
const session = require('express-session');
const path = require('path');
const RedisStore = require('connect-redis')(session);
const morgan = require('morgan');
const api = require('./api');
require('./update');

const app = express();
app.use(morgan('dev'));

const options = {
	'host': '127.0.0.1',
	'port': '6379'
};
app.use(session({
  store: new RedisStore(options),
	secret: 'liqiang',
  name: 'note_to_search_session',
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  resave: false,
  saveUninitialized: false
}));

app.use('/api', api);

app.use(express.static('../client/dist'));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

app.listen(5555);
