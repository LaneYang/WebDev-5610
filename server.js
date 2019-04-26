const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));






app.use(express.static(path.join(__dirname, 'dist/my-project')));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'webdev5610'
}));

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || '3200';
app.set('port', port);


var mongoUrl = 'mongodb://heroku_cbgz6v2h:9fedtmcqsimttolk6t57emuuel@ds147746.mlab.com:47746/heroku_cbgz6v2h';

mongoose.Promise = global.Promise;
const client = mongoose.connect( mongoUrl, { useNewUrlParser: true });


var db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
require('./assignment/app')(app);

const server = http.createServer(app);
server.listen( port, () => console.log('Running on port', app.get('port')));


