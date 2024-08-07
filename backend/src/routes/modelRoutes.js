const express = require('express');
const { saveModel } = require('../controllers/modelController');

const router = express.Router();

router.post('/models', saveModel);
// Similarly, define other CRUD routes

module.exports = router;
