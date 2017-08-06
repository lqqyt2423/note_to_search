const express = require('express');
const session = require('express-session');
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

// app.get('/login', (req, res) => {
//   let query = req.query;
//   if (query.user === 'liqiang' && query.passwd === '0000') {
//     req.session.userId = '1';
//     res.end('success login');
//   }
//   res.end('login');
// });
//
// app.use((req, res, next) => {
//   if (req.session.userId) {
//     next();
//   } else {
//     res.redirect('/login');
//   }
// });

// app.get('*', (req, res, next) => {
// 	if (!req.session.userId)  req.session.userId = Math.random().toString(36).substr(2, 8);
// 	console.log(req.session);
// 	next();
// });

app.use('/api', api);

app.listen(5555);
