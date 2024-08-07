const { insertAgent } = require('../models/agentModel');

const saveAgent = (req, res) => {
  const agent = req.body;
  insertAgent(agent, (err, agentId) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json({ id: agentId, message: 'Agent saved' });
  });
};

// Similarly, define other CRUD operations

module.exports = {
  saveAgent,
  // other CRUD operations
};
