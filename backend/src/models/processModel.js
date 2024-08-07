const db = require('../../db');

const insertProcess = (process, callback) => {
  const stmt = db.prepare(`
    INSERT INTO processes (process_name, description)
    VALUES (?, ?)
  `);
  stmt.run(process.process_name, process.description, function(err) {
    callback(err, this.lastID);
  });
  stmt.finalize();
};

// Similarly, define other CRUD operations

module.exports = {
  insertProcess,
  // other CRUD operations
};
