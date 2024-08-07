const { insertModel } = require('../models/modelModel');

const saveModel = (req, res) => {
  const model = req.body;
  insertModel(model, (err, modelId) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json({ id: modelId, message: 'Model saved' });
  });
};

// Similarly, define other CRUD operations

module.exports = {
  saveModel,
  // other CRUD operations
};
