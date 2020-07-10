/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var errorHandler = require('errorhandler');
var logger = require('morgan');
const setupApiRoutes = require('./api.config');
const cors = require('cors');
// This should refer to the local React and gets installed via `npm install` in
// the example.
var reactViews = require('express-react-views');

var app = express();

var whitelist = [
  'http://localhost:3100',
  'http://localhost:3101',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:8333',
  'https://www.blackboard-th.com',
  'https://classroom.blackboard-th.com',
  'https://blackboard-backend-ui-react.ndevs260340.vercel.app',
  'https://manager.blackboard-th.com',
]
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}





// all environments
app.set('port', 3100);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptionsDelegate))
// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.locals.something = 'value';
app.locals.qaz = 'qut';

app.get('/', routes.index);
app.get('/users', user.list);

setupApiRoutes(app);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
