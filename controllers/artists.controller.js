artistsController = {};

artistsController.getArtists = async (req, res) => {
    if (req.query.name !== undefined) {
        await spotifyApi.searchArtists(req.query.name, {limit : 10, market : ['JP', 'PA', 'US']})
        .then(function(data) {
          res.render('artists', { user: req.user, searchResults: data.body.artists.items, title: 'Spotify API Showcase - Search Artists Results'});
        }, function(err) {
          console.error(err);
        });    
      } else{
        res.render('artists', { user: req.user, title: 'Spotify API Showcase - Search Artists'});
      }
}

artistsController.getArtist = async (req, res) => {
    var artist = {};
    await spotifyApi.getArtist(req.params.id)
    .then(function(data) {
        artist.info = data.body
    }, function(err) {
        console.error(err);
    });

    await spotifyApi.getArtistAlbums(req.params.id, { include_groups : 'album,single,compilation', limit : 50}).then(
        function(data) {
            artist.discography = data.body.items
            res.render('artist', { user: req.user, artist: artist});
        },
        function(err) {
            console.error(err);
        }
    ); 
}

module.exports = artistsController;