const { insertTask } = require('../models/taskModel');

const saveTask = (req, res) => {
  const task = req.body;
  insertTask(task, (err, taskId) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json({ id: taskId, message: 'Task saved' });
  });
};

// Similarly, define other CRUD operations

module.exports = {
  saveTask,
  // other CRUD operations
};
