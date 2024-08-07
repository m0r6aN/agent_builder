const db = require('../../db');

const insertTask = (task, callback) => {
  const stmt = db.prepare(`
    INSERT INTO tasks (task_name, description)
    VALUES (?, ?)
  `);
  stmt.run(task.task_name, task.description, function(err) {
    callback(err, this.lastID);
  });
  stmt.finalize();
};

// Similarly, define other CRUD operations

module.exports = {
  insertTask,
  // other CRUD operations
};
