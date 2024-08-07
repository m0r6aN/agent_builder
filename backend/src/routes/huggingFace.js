const express = require('express');
const { body } = require('express-validator');
const validate = require('./middleware/validate'); // Assuming you have a validate middleware
const { HfInference } = require('@huggingface/inference');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const API_KEY = 'your_huggingface_api_key'; // Replace with your Hugging Face API key
const hf = new HfInference(API_KEY);

async function searchModels(searchQuery) {
  try {
    const models = await hf.searchModels({
      query: searchQuery,
      limit: 10, // Adjust limit as needed
    });

    return models;
  } catch (error) {
    console.error('Error searching models:', error);
    throw error;
  }
}

app.post('/api/search-models',
  [
    body('query').notEmpty().withMessage('Search query is required')
  ],
  validate,
  async (req, res) => {
    const { query } = req.body;

    try {
      const models = await searchModels(query);
      res.status(200).json(models);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search models' });
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
