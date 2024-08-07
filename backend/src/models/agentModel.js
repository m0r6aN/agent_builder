const db = require('../../db');

const insertAgent = (agent, callback) => {
  const stmt = db.prepare(`
    INSERT INTO agents (
      name, description, model_type, default_prompt, system_message, 
      max_turns, temperature, top_p, tools, sample_prompts, generated_code
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    agent.name, agent.description, agent.model_type, agent.default_prompt, agent.system_message, 
    agent.max_turns, agent.temperature, agent.top_p, agent.tools, agent.sample_prompts, agent.generated_code,
    function(err) {
      callback(err, this.lastID);
    }
  );
  stmt.finalize();
};

// Similarly, define other CRUD operations

module.exports = {
  insertAgent,
  // other CRUD operations
};
