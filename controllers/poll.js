const Question = require('../models/question');
const User = require('../models/user');

exports.getPollStartForm = (req, res, next) => {
  res.render('start-form', { pageTitle: 'doshas poll', path: '/poll' });
};

exports.postPollStartForm = (req, res, next) => {
  const user = new User(req.body);
  user.save();
  // uso el next así llego con el método POST y no se puede entrar a la encuesta sin llenar el form
  next();
};

const arrayShuffle = (array) => {
  let newIndex; let temp;
  for (let i = array.length-1; i > 0; i--) {
    newIndex =  Math.floor((Math.random() * (i+1)));
    temp = array[i];
    array[i] = array[newIndex];
    array[newIndex] = temp;
  } 
  return array; 
}

exports.postPollStart = (req, res, next) => {
  Question.fetchAll(questions => {
    shuffleQuestions = arrayShuffle(questions)
    console.log(questions);
    res.render('poll', { pageTitle: 'doshas poll', path: '/poll', questions: shuffleQuestions });
  })
};

exports.postPollResults = (req, res, next) => {
  // guardo los resultados
  console.log(req.body);
  User.savePollResults(req.body)
  res.redirect('/poll/results');
};

exports.getPollResults = (req, res, next) => {
  // muestro los resultados
  User.getUsers( users => {
    const currentUser = Object.assign(new User(users[users.length - 1]), users[users.length - 1]);
    currentUser.parseResults( results => {
      currentUser.parsedResults = results;
      console.log('printeo el argumento de la callback:', results);
      res.render('results', { pageTitle: 'doshas poll - results', path: '/poll', currentUser: currentUser });
    });
  });
};