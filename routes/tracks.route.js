const express = require('express');
const tracksController = require('../controllers/tracks.controller');

const router = express.Router();

/* GET tracks page. */
router.get('/', tracksController.getTracks);

module.exports = router;
