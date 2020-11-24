var express = require('express');
var router = express.Router();

/* GET tracks page. */
router.get('/', function(req, res) {
  if (req.query.name !== undefined) {
    spotifyApi.searchTracks(req.query.name, {limit : 25, market : ['JP', 'PA', 'US']})
    .then(function(data) {
      res.render('tracks', { user: req.user, searchResults: data.body.tracks.items, title: 'Spotify API Showcase - Search Tracks Results'});
    }, function(err) {
      console.error(err);
    });    
  } else{
    res.render('tracks', { user: req.user, title: 'Spotify API Showcase - Search Tracks'});
  }
});

module.exports = router;