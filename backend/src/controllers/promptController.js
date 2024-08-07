const { insertPrompt } = require('../models/promptModel');

const savePrompt = (req, res) => {
  const prompt = req.body;
  insertPrompt(prompt, (err, promptId) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json({ id: promptId, message: 'Prompt saved' });
  });
};

// Similarly, define other CRUD operations

module.exports = {
  savePrompt,
  // other CRUD operations
};
