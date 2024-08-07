const express = require('express');
const { saveTask } = require('../controllers/taskController');

const router = express.Router();

router.post('/tasks', saveTask);
// Similarly, define other CRUD routes

module.exports = router;
