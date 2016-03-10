var express = require('express')
  , session = require('express-session')
  , passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy

  var app = express();
  var keys = require('./keys')

//Need to be in the right order. Don't call session before
app.use(session({secret: 'just some random string'}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: 'keys.facebook_clientId',
  clientSecret: 'keys.facebook_secret',
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
  return done(null, profile);
}));

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/me',
  failureRedirect: '/login'
}))

passport.serializeUser(function(dataToSerialize, done) {
  done(null, dataToSerialize);
})

passport.deserializeUser(function(dataFromSessiontoPutOnReqDotUser, done) {
  done(null, dataFromSessiontoPutOnReqDotUser);
})

app.get('/me', function(req, res) {
  res.send(req.user);
})


  app.listen('3000', function() {
    console.log('server started successfully');
  })
