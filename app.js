var express = require('express'),
	routes = require('./routes'),
	api = require('./routes/api'),
	http = require('http'),
	path = require('path');
const cors = require('cors');
var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
app.use(cors());

// io.use(cors());

// Socket.io Communication
io.set('origins', '*:*');
io.sockets.on('connection', require('./routes/socket'));
/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', '*');
//     res.header('Access-Control-Allow-Headers', '*');

//     next();
// });
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
// development only
if (app.get('env') === 'development') {
	app.use(express.errorHandler());
}

// production only	
if (app.get('env') === 'production') {
	// TODO
};


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */


server.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
