const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { user: req.user, title: req.t(`common:app_name`) });
});

module.exports = router;
