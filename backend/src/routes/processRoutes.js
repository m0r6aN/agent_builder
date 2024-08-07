const express = require('express');
const { saveProcess } = require('../controllers/processController');

const router = express.Router();

router.post('/processes', saveProcess);
// Similarly, define other CRUD routes

module.exports = router;
