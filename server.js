/**
 * Module dependencies.
 */
var express = require('express'),
  fs = require('fs'),
  passport = require('passport'),
  logger = require('mean-logger'),
  dotenv = require('dotenv'),
  io = require('socket.io');

var port = config.port,
  server,
  ioObj;
/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */
dotenv.config({silent: true});
//Load configurations
//if test env, load example file
process.env.NODE_ENV = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';
var env = process.env.NODE_ENV,
  config = require('./config/config'),
  auth = require('./config/middlewares/authorization'),
  mongoose = require('mongoose');

  console.log('Config.db is: ' + config.db);
//Bootstrap db connection
mongoose.connect(config.db).then((err) => {
  if(err) throw (err.message);
  //express settings
  require('./config/express')(app, passport, mongoose);

  //Bootstrap routes
  require('./config/routes')(app, passport, auth);

  //Start the app by listening on <port>

  server = app.listen(port);
  console.log('Express app started...');
  ioObj = io.listen(server, { log: false });
  //game logic handled here
  require('./config/socket/socket')(ioObj);

  //Initializing logger
  logger.init(app, passport, mongoose);
});

//Bootstrap models
var models_path = __dirname + '/app/models';
var walk = function(path) {
  fs.readdirSync(path).forEach(function(file) {
    var newPath = path + '/' + file;
    var stat = fs.statSync(newPath);
    if (stat.isFile()) {
      if (/(.*)\.(js|coffee)/.test(file)) {
        require(newPath);
      }
    } else if (stat.isDirectory()) {
      walk(newPath);
    }
  });
};
walk(models_path);

//bootstrap passport config
require('./config/passport')(passport);

var app = express();

app.use(function(req, res, next){
  next();
});

//expose app
exports = module.exports = app;
