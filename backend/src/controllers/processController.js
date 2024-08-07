const { insertProcess } = require('../models/processModel');

const saveProcess = (req, res) => {
  const process = req.body;
  insertProcess(process, (err, processId) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json({ id: processId, message: 'Process saved' });
  });
};

// Similarly, define other CRUD operations

module.exports = {
  saveProcess,
  // other CRUD operations
};
