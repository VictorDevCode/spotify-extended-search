var express = require('express');
var router = express.Router();
const tracksController = require('../controllers/tracks.controller');

/* GET tracks page. */
router.get('/', tracksController.getTracks);

module.exports = router;