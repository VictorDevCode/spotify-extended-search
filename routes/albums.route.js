var express = require('express');
var router = express.Router();
const albumsController = require('../controllers/albums.controller');

/* GET albums page. */
router.get('/', albumsController.getAlbums);

/** Get an album by ID */
router.get('/:id', albumsController.getAlbum);

module.exports = router;