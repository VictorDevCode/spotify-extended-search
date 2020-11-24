var express = require('express');
var router = express.Router();

/* GET artists page. */
router.get('/', function(req, res) {
  if (req.query.name !== undefined) {
    spotifyApi.searchArtists(req.query.name, {limit : 10, market : ['JP', 'PA', 'US']})
    .then(function(data) {
      res.render('artists', { user: req.user, searchResults: data.body.artists.items, title: 'Spotify API Showcase - Search Artists Results'});
    }, function(err) {
      console.error(err);
    });    
  } else{
    res.render('artists', { user: req.user, title: 'Spotify API Showcase - Search Artists'});
  }
});

module.exports = router;
