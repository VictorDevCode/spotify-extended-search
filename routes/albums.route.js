const express = require('express');
const albumsController = require('../controllers/albums.controller');

const router = express.Router();

/* GET albums page. */
router.get('/', albumsController.getAlbums);

/** Get an album by ID */
router.get('/:id', albumsController.getAlbum);

module.exports = router;
