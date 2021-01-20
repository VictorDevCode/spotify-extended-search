const artistsController = {};
const _ = require('lodash/core');

artistsController.getArtists = async (req, res) => {
  if (req.query.search !== undefined) {
    await req.app.locals.spotifyApi.searchArtists(req.query.search, { limit: 10, market: ['JP', 'PA', 'US'] })
      .then((data) => {
        res.render('artists/artistsSearch',
          {
            searchResults: data.body.artists.items,
            searchValue: req.query.search,
            title: 'Spotify API Showcase - Search Artists Results',
            user: req.user,
          });
      }, (err) => {
        res.render('error', { error: err });
      });
  } else {
    res.render('artists/artistsSearch', { user: req.user, title: 'Spotify API Showcase - Search Artists' });
  }
};

artistsController.getArtist = async (req, res) => {
  const artist = {};
  await req.app.locals.spotifyApi.getArtist(req.params.id)
    .then((data) => {
      artist.info = data.body;
    }, (err) => {
      res.render('error', { error: err });
    });

  await req.app.locals.spotifyApi.getArtistAlbums(req.params.id, { limit: 50 }).then(
    (data) => {
      artist.discography = {};
      artist.discography.singles = _.filter(data.body.items, { album_group: 'single' });
      artist.discography.albums = _.filter(data.body.items, { album_group: 'album' });
      artist.discography.compilations = _.filter(data.body.items, { album_group: 'compilation' });
      artist.discography.appears_on = _.filter(data.body.items, { album_group: 'appears_on' });
      res.render('artists/artistDetails',
        {
          artist,
          title: `Spotify API Showcase - Artist - ${artist.info.name}`,
          user: req.user,
        });
    },
    (err) => {
      res.render('error', { error: err });
    },
  );
};

module.exports = artistsController;
