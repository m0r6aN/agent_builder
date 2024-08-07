const db = require('../../db');

const insertModel = (model, callback) => {
  const stmt = db.prepare(`
    INSERT INTO models (name, description, api_key, model_type, version, additional_config)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  stmt.run(model.name, model.description, model.api_key, model.model_type, model.version, model.additional_config, function(err) {
    callback(err, this.lastID);
  });
  stmt.finalize();
};

// Similarly, define other CRUD operations

module.exports = {
  insertModel,
  // other CRUD operations
};
