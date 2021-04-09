const tracksController = {};

tracksController.getTracks = async (req, res) => {
  if (req.query.search !== undefined) {
    await req.app.locals.spotifyApi
      .searchTracks(req.query.search, { limit: 25, market: ['JP', 'PA', 'US'] })
      .then(
        (data) => {
          res.render('tracks/tracksSearch', {
            lang: req.language,
            searchResults: data.body.tracks.items,
            searchValue: req.query.search,
            title: `${req.t('common:app_name')} -
                    ${req.t('tracks:search_tracks')}`,
            user: req.user,
            meta_description: req.t(`index:track_section_description`),
          });
        },
        (err) => {
          res.render('error', { error: err });
        },
      );
  } else {
    res.render('tracks/tracksSearch', {
      lang: req.language,
      meta_description: req.t(`index:track_section_description`),
      user: req.user,
      title: `${req.t('common:app_name')} -
      ${req.t('tracks:search_tracks')}`,
    });
  }
};

tracksController.getTrack = async (req, res) => {
  await req.app.locals.spotifyApi.getTrack(req.params.id).then(
    (data) => {
      res.render('tracks/trackDetails', {
        lang: req.language,
        meta_description: req.t(`index:track_section_description`),
        title: `${req.t('common:app_name')} -
        ${req.t('common:track')} -
        ${data.body.name}`,
        track: data.body,
        user: req.user,
      });
    },
    (err) => {
      res.render('error', { error: err });
    },
  );
};

module.exports = tracksController;
