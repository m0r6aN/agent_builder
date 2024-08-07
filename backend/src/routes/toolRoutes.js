const express = require('express');
const { saveTool } = require('../controllers/toolController');

const router = express.Router();

router.post('/tools', saveTool);
// Similarly, define other CRUD routes

module.exports = router;
