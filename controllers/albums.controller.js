const albumsController = {};
const countriesJSON = require('../public/json/countries_ISO_3166-1_alpha-2.json');

albumsController.getAlbums = async (req, res) => {
  if (req.query.search !== undefined) {
    await req.app.locals.spotifyApi.searchAlbums(req.query.search, { limit: 25, market: ['JP', 'PA', 'US'] })
      .then((data) => {
        res.render('albums/albumsSearch',
          {
            searchResults: data.body.albums.items,
            searchValue: req.query.search,
            title: 'Spotify API Showcase - Search Albums Results',
            user: req.user,
          });
      }, (err) => {
        res.render('error', { error: err });
      });
  } else {
    res.render('albums/albumsSearch', { user: req.user, title: 'Spotify API Showcase - Search Albums' });
  }
};

albumsController.getAlbum = async (req, res) => {
  const album = {};
  await req.app.locals.spotifyApi.getAlbum(req.params.id)
    .then((data) => {
      album.info = data.body;
    }, (err) => {
      res.render('error', { error: err });
    });
  await req.app.locals.spotifyApi.getAlbumTracks(req.params.id, { limit: 50 })
    .then((data) => {
      album.tracks = data.body;
      res.render('albums/albumDetails',
        {
          album,
          countriesJSON,
          title: `Spotify API Showcase - Album - ${album.info.name}`,
          user: req.user,
        });
    }, (err) => {
      res.render('error', { error: err });
    });
};

module.exports = albumsController;
