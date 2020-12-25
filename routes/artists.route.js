const express = require('express');
const artistsController = require('../controllers/artists.controller');

const router = express.Router();

/* GET artists page. */
router.get('/', artistsController.getArtists);

/** Get an artist by ID */
router.get('/:id', artistsController.getArtist);

module.exports = router;
