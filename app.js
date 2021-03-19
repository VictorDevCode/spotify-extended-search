const express = require('express');
const createError = require('http-errors');
const SpotifyStrategy = require('passport-spotify').Strategy;
const SpotifyWebApi = require('spotify-web-api-node');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const i18nextBackend = require('i18next-fs-backend');
const isAuthenticated = require('./middlewares/isAuthenticated');
require('dotenv').config();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(
  session({
    secret: process.env.CLIENT_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

i18next
  .use(i18nextBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    ns: ['albums', 'artists', 'common', 'index', 'navbar', 'tracks'],
    lng: 'us',
    fallbackLng: 'es',
    preload: ['en', 'es'],
    backend: {
      loadPath: path.join(__dirname, 'public/locales/{{lng}}/{{ns}}.json'),
    },
    detection: {
      order: ['querystring', 'cookie'],
      caches: ['cookie'],
      lookupQuerystring: 'locale',
      lookupCookie: 'locale',
      ignoreCase: true,
      cookieSecure: true,
    },
  });
app.use(i18nextMiddleware.handle(i18next));

// Setting routes
app.use('/', require('./routes/index'));
app.use('/artists', isAuthenticated, require('./routes/artists.route'));
app.use('/albums', isAuthenticated, require('./routes/albums.route'));
app.use('/tracks', isAuthenticated, require('./routes/tracks.route'));

app.use(
  '/bulma',
  express.static(path.join(__dirname, '/node_modules/bulma/css/')),
);
app.use(
  '/font-awesome',
  express.static(
    path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free/'),
  ),
);

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
app.locals.spotifyApi = new SpotifyWebApi();
passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        app.locals.spotifyApi.setAccessToken(accessToken);
        app.locals.spotifyApi.setRefreshToken(refreshToken);
        return done(null, profile);
      });
    },
  ),
);

app.get(
  '/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  },
);

// Set logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/lang/:code', (req, res) => {
  req.i18n.changeLanguage(req.params.code);
  res.redirect('back');
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
