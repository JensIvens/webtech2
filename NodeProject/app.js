
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var ask = require('./routes/ask');
var user = require('./routes/user');
var questions = require('./routes/questions');
var moderate = require ('./routes/moderate');
var http = require('http');
var path = require('path');
var faye = require('faye');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
app.get('/users', user.list);
app.get('/ask', ask.ask);
app.get('/questions', questions.questions);
app.get('/moderate', moderate.moderate);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var bayeux = new faye.NodeAdapter({mount: '/faye'});

bayeux.attach(server);
server.listen('3000');