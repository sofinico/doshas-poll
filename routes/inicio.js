const express = require('express');

const primaryController = require('../controllers/primary');

const router = express.Router();

router.get('/', primaryController.getInicio);

module.exports = router;