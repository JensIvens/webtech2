
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

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
 
var FACEBOOK_APP_ID = '1479249652292230';
var FACEBOOK_APP_SECRET = 'a9860512ec767db3cd0fd76f7f6109bb';
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
    //Assuming user exists
    done(null, profile);
  });
}));

app.get('/auth/facebook', passport.authenticate('facebook'));
 
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/ask',
  failureRedirect: '/error'
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/ask', function(req, res, next) {
  res.send('Successfully logged in.');
  	console.log(req)
});
 
app.get('/error', function(req, res, next) {
  res.send("Error logging in.");
});
app.get('/', function(req, res, next) {
  res.sendfile('./html/auth.html');
});
app.get('/users', user.list);
app.get('/questions', questions.questions);
app.get('/moderate', moderate.moderate);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var bayeux = new faye.NodeAdapter({mount: '/faye'});

bayeux.attach(server);
server.listen('3000');