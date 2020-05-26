exports.get404 = (req, res, next) => {
  res.status(404).render('404', { pageTitle: 'error 404', path: undefined });
};

exports.getNoPoll = (req, res, next) => {
  res.render('no-poll', { pageTitle: 'nacen así', path: undefined });
};