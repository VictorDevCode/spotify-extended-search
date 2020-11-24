var express = require('express');
var router = express.Router();
var countriesJSON = require('../public/json/countries_ISO_3166-1_alpha-2.json')

/* GET album page. */
router.get('/:id', function(req, res) {
    var album = {};
    spotifyApi.getAlbum(req.params.id)
    .then(function(data) {
        album.info = data.body
    }, function(err) {
        console.error(err);
    });    
    spotifyApi.getAlbumTracks(req.params.id, { limit : 50})
        .then(function(data) {
            album.tracks = data.body;
            res.render('album', { user: req.user, album: album , countriesJSON: countriesJSON});
        }, function(err) {
        console.error(err);
    });
});

module.exports = router;