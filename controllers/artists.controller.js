const artistsController = {};

artistsController.getArtists = async (req, res) => {
  if (req.query.name !== undefined) {
    await req.app.locals.spotifyApi.searchArtists(req.query.name, { limit: 10, market: ['JP', 'PA', 'US'] })
      .then((data) => {
        res.render('artists/artistsSearch',
          {
            user: req.user,
            searchResults: data.body.artists.items,
            title: 'Spotify API Showcase - Search Artists Results',
            searchValue: req.query.name,
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

  await req.app.locals.spotifyApi.getArtistAlbums(req.params.id, { include_groups: 'album,single,compilation', limit: 50 }).then(
    (data) => {
      artist.discography = data.body.items;
      res.render('artists/artistDetails',
        {
          user: req.user,
          artist,
          title: `Spotify API Showcase - Artist - ${artist.info.name}`,
        });
    },
    (err) => {
      res.render('error', { error: err });
    },
  );
};

module.exports = artistsController;
