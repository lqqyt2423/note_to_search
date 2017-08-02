const express = require('express');
const morgan = require('morgan');
const api = require('./api');
require('./update');

const app = express();

app.use(morgan('dev'));
app.use('/api', api);

app.listen(5555);
