exports.getInicio = (req, res, next) => {res.render('inicio', {
    pageTitle: 'doshas',
    path: '/'
  });
};