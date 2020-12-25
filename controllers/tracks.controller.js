const tracksController = {};

tracksController.getTracks = async (req, res) => {
  if (req.query.name !== undefined) {
    await spotifyApi.searchTracks(req.query.name, { limit: 25, market: ['JP', 'PA', 'US'] })
      .then((data) => {
        res.render('tracks/tracksSearch', { user: req.user, searchResults: data.body.tracks.items, title: 'Spotify API Showcase - Search Tracks Results' });
      }, (err) => {
        console.error(err);
      });
  } else {
    res.render('tracks/tracksSearch', { user: req.user, title: 'Spotify API Showcase - Search Tracks' });
  }
};

module.exports = tracksController;
