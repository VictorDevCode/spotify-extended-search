const express = require('express');
const createError = require('http-errors');
const SpotifyStrategy = require('passport-spotify').Strategy;
const SpotifyWebApi = require('spotify-web-api-node');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
require('dotenv').config();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(session({ secret: process.env.CLIENT_SECRET, resave: true, saveUninitialized: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// Setting routes
app.use('/', require('./routes/index'));
app.use('/artists', require('./routes/artists.route'));
app.use('/albums', require('./routes/albums.route'));
app.use('/tracks', require('./routes/tracks.route'));

app.use('/bulma', express.static(path.join(__dirname, '/node_modules/bulma/css/')));
app.use('/font-awesome', express.static(path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free/')));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true,
  }),
);

// Use the SpotifyStrategy within Passport.
spotifyApi = new SpotifyWebApi();
passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.setRefreshToken(refreshToken);
        return done(null, profile);
      });
    },
  ),
);

app.get(
  '/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
  },
);

// Set logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { user: req.user });
});

module.exports = app;
