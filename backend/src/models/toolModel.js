const db = require('../../db');

const insertTool = (tool, callback) => {
  const stmt = db.prepare(`
    INSERT INTO tools (tool_name, description, generated_code)
    VALUES (?, ?, ?)
  `);
  stmt.run(tool.tool_name, tool.description, tool.generated_code, function(err) {
    callback(err, this.lastID);
  });
  stmt.finalize();
};

// Similarly, define other CRUD operations

module.exports = {
  insertTool,
  // other CRUD operations
};
