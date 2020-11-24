var express = require('express');
var router = express.Router();

/* GET artist page. */
router.get('/:id', function(req, res) {
    var artist = {};
    spotifyApi.getArtist(req.params.id)
    .then(function(data) {
        artist.info = data.body
    }, function(err) {
        console.error(err);
    });

    spotifyApi.getArtistAlbums(req.params.id, { include_groups : 'album,single,compilation', limit : 50}).then(
    function(data) {
      artist.discography = data.body.items
      res.render('artist', { user: req.user, artist: artist});
    },
    function(err) {
      console.error(err);
    }
  ); 
});

module.exports = router;