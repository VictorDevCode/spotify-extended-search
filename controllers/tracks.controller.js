const tracksController = {};
const countriesJSON = require('../public/json/countries_ISO_3166-1_alpha-2.json');

tracksController.getTracks = async (req, res) => {
  if (req.query.name !== undefined) {
    await req.app.locals.spotifyApi.searchTracks(req.query.name, { limit: 25, market: ['JP', 'PA', 'US'] })
      .then((data) => {
        res.render('tracks/tracksSearch',
          {
            user: req.user,
            searchResults: data.body.tracks.items,
            title: 'Spotify API Showcase - Search Tracks Results',
            searchValue: req.query.name,
          });
      }, (err) => {
        res.render('error', { error: err });
      });
  } else {
    res.render('tracks/tracksSearch', { user: req.user, title: 'Spotify API Showcase - Search Tracks' });
  }
};

tracksController.getTrack = async (req, res) => {
  await req.app.locals.spotifyApi.getTrack(req.params.id)
    .then((data) => {
      res.render('tracks/trackDetails',
        {
          countriesJSON,
          title: `Spotify API Showcase - Track - ${data.body.name}`,
          track: data.body,
          user: req.user,
        });
    }, (err) => {
      res.render('error', { error: err });
    });
};

module.exports = tracksController;
