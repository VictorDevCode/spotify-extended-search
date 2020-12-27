const artistsController = {};

artistsController.getArtists = async (req, res) => {
  if (req.query.name !== undefined) {
    await spotifyApi.searchArtists(req.query.name, { limit: 10, market: ['JP', 'PA', 'US'] })
      .then((data) => {
        res.render('artists/artistsSearch', { user: req.user, searchResults: data.body.artists.items, title: 'Spotify API Showcase - Search Artists Results' });
      }, (err) => {
        console.error(err);
      });
  } else {
    res.render('artists/artistsSearch', { user: req.user, title: 'Spotify API Showcase - Search Artists' });
  }
};

artistsController.getArtist = async (req, res) => {
  const artist = {};
  await spotifyApi.getArtist(req.params.id)
    .then((data) => {
      artist.info = data.body;
    }, (err) => {
      console.error(err);
    });

  await spotifyApi.getArtistAlbums(req.params.id, { include_groups: 'album,single,compilation', limit: 50 }).then(
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
      console.error(err);
    },
  );
};

module.exports = artistsController;
