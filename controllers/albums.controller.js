albumsController = {};
var countriesJSON = require('../public/json/countries_ISO_3166-1_alpha-2.json');

albumsController.getAlbums = async (req, res) => {
    if (req.query.name !== undefined) {
        await spotifyApi.searchAlbums(req.query.name, {limit : 25, market : ['JP', 'PA', 'US']})
            .then(function(data) {
            res.render('albums/albumsSearch', { user: req.user, searchResults: data.body.albums.items, title: 'Spotify API Showcase - Search Albums Results'});
        }, function(err) {
                console.error(err);
            });    
    } else {
          res.render('albums/albumsSearch', { user: req.user, title: 'Spotify API Showcase - Search Albums'});
        }
};

albumsController.getAlbum = async (req, res) => {
    var album = {};
    await spotifyApi.getAlbum(req.params.id)
    .then(function(data) {
        album.info = data.body
    }, function(err) {
        console.error(err);
    });    
    await spotifyApi.getAlbumTracks(req.params.id, { limit : 50})
        .then(function(data) {
            album.tracks = data.body;
            res.render('albums/albumDetails', { user: req.user, album: album , countriesJSON: countriesJSON});
        }, function(err) {
            console.error(err);
        });
}

module.exports = albumsController;