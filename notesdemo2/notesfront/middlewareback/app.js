var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var userschema = require('./schemas/userschema.json');
var noteschema = require('./schemas/notesschema.json');
var validateSchema = require('./middlewares/validate');

const loginRouter = require('./routes/loginRouter')
const registerRouter = require('./routes/registerRouter')
const notesRouter = require('./routes/notesRouter')

const isAuthenticated = require('./middlewares/auth')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/register', validateSchema(userschema), registerRouter);
app.use('/login', loginRouter);
app.use('/notes', isAuthenticated, validateSchema(noteschema), notesRouter);



module.exports = app;
