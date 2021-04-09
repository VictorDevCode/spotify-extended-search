const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    lang: req.language,
    meta_description: req.t(`index:hero_text`),
    user: req.user,
    title: req.t(`common:app_name`),
  });
});

module.exports = router;
