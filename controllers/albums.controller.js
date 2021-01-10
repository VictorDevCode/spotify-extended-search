const albumsController = {};
const countriesJSON = require('../public/json/countries_ISO_3166-1_alpha-2.json');

albumsController.getAlbums = async (req, res) => {
  if (req.query.name !== undefined) {
    await spotifyApi.searchAlbums(req.query.name, { limit: 25, market: ['JP', 'PA', 'US'] })
      .then((data) => {
        res.render('albums/albumsSearch',
          {
            user: req.user,
            searchResults: data.body.albums.items,
            title: 'Spotify API Showcase - Search Albums Results',
            searchValue: req.query.name,
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
  await spotifyApi.getAlbum(req.params.id)
    .then((data) => {
      album.info = data.body;
    }, (err) => {
      res.render('error', { error: err });
    });
  await spotifyApi.getAlbumTracks(req.params.id, { limit: 50 })
    .then((data) => {
      album.tracks = data.body;
      res.render('albums/albumDetails',
        {
          user: req.user,
          album,
          countriesJSON,
          title: `Spotify API Showcase - Album - ${album.info.name}`,
        });
    }, (err) => {
      res.render('error', { error: err });
    });
};

module.exports = albumsController;
