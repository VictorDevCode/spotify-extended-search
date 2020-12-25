var createError = require('http-errors');
require('dotenv').config();
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
var SpotifyWebApi = require('spotify-web-api-node');
spotifyApi = new SpotifyWebApi;
var indexRouter = require('./routes/index');
var artistsRouter = require('./routes/artists.route');
var albumsRouter = require('./routes/albums.route');
var tracksRouter = require('./routes/tracks.route');
const spotifyClientID = process.env.CLIENT_ID;
const spotifyClientSecret = process.env.CLIENT_SECRET;

app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// Setting routes
app.use('/', indexRouter);
app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/bulma', express.static(__dirname + '/node_modules/bulma/css/'));
app.use('/font-awesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true
  })
);

// Use the SpotifyStrategy within Passport.
passport.use(
  new SpotifyStrategy(
    {
      clientID: spotifyClientID,
      clientSecret: spotifyClientSecret,
      callbackURL: 'http://localhost:3000/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.setRefreshToken(refreshToken);
        return done(null, profile);
      });
    }
  )
);

app.get(
  '/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {user: req.user});
});

module.exports = app;
