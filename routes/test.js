const express = require('express');

const pollController = require('../controllers/poll');

const router = express.Router();

router.get('/', pollController.getPollStartForm);

router.post('/start', pollController.postPollStartForm);

router.post('/start', pollController.postPollStart);

router.post('/results-form', pollController.postPollResults);

router.get('/results', pollController.getPollResults);

module.exports = router;