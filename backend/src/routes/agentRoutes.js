const express = require('express');
const { body } = require('express-validator');
const { saveAgent } = require('../controllers/agentController');
const validate = require('../middleware/validate');

const router = express.Router();

// Similarly, define other CRUD routes with validation or perform validations in the UI
router.post('/agents',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('model_type').notEmpty().withMessage('Model type is required'),
  ],
  validate,
  saveAgent
);

module.exports = router;
