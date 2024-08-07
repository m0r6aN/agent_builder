const { insertTool } = require('../models/toolModel');

const saveTool = (req, res) => {
  const tool = req.body;
  insertTool(tool, (err, toolId) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json({ id: toolId, message: 'Tool saved' });
  });
};

// Similarly, define other CRUD operations

module.exports = {
  saveTool,
  // other CRUD operations
};
