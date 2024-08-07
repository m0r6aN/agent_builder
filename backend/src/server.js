require('dotenv').config();
const express = require('express');
const { body } = require('express-validator');
const validate = require('./middleware/validate'); 
const { searchModels } = require('./controllers/huggingFaceController');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/search-models',
  [
    body('query').notEmpty().withMessage('Search query is required')
  ],
  validate,
  searchModels
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
