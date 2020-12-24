var express = require('express');
var router = express.Router();
const artistsController = require('../controllers/artists.controller')

/* GET artists page. */
router.get('/', artistsController.getArtists);

/** Get an artist by ID */
router.get('/:id', artistsController.getArtist);

module.exports = router;
