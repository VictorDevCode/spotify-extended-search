var express = require('express');
var router = express.Router();

/* GET albums page. */
router.get('/', function(req, res) {
  if (req.query.name !== undefined) {
    spotifyApi.searchAlbums(req.query.name, {limit : 25, market : ['JP', 'PA', 'US']})
    .then(function(data) {
      res.render('albums', { user: req.user, searchResults: data.body.albums.items, title: 'Spotify API Showcase - Search Albums Results'});
    }, function(err) {
      console.error(err);
    });    
  } else{
    res.render('albums', { user: req.user, title: 'Spotify API Showcase - Search Albums'});
  }
});

module.exports = router;