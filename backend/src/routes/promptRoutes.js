const express = require('express');
const { savePrompt } = require('../controllers/promptController');

const router = express.Router();

router.post('/prompts', savePrompt);
// Similarly, define other CRUD routes

module.exports = router;
