const express = require('express');
const tracksController = require('../controllers/tracks.controller');

const router = express.Router();

/* Get search tracks page. */
router.get('/', tracksController.getTracks);

/** Get an track by ID */
router.get('/:id', tracksController.getTrack);

module.exports = router;
