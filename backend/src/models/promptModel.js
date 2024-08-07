const db = require('../../db');

const insertPrompt = (prompt, callback) => {
  const stmt = db.prepare(`
    INSERT INTO prompts (prompt_name, text)
    VALUES (?, ?)
  `);
  stmt.run(prompt.prompt_name, prompt.text, function(err) {
    callback(err, this.lastID);
  });
  stmt.finalize();
};

// Similarly, define other CRUD operations

module.exports = {
  insertPrompt,
  // other CRUD operations
};
