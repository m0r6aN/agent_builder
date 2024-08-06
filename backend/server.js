const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Save a new agent
app.post('/agents', (req, res) => {
  const { 
    AgentName, Description, ModelType, DefaultPrompt, SystemMessage, 
    MaxTurns, Temperature, topP, Tools, SamplePrompts, GeneratedCode 
  } = req.body;

  const stmt = db.prepare(`
    INSERT INTO Agents (
      AgentName, Description, ModelType, DefaultPrompt, SystemMessage, 
      MaxTurns, Temperature, topP, Tools, SamplePrompts, GeneratedCode
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run(
    AgentName, Description, ModelType, DefaultPrompt, SystemMessage, 
    MaxTurns, Temperature, topP, Tools, SamplePrompts, GeneratedCode,
    function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send('Agent saved');
    }
  );

  stmt.finalize();
});

// Update an agent
app.put('/agents/:id', (req, res) => {
  const { id } = req.params;
  const { 
    AgentName, Description, ModelType, DefaultPrompt, SystemMessage, 
    MaxTurns, Temperature, topP, Tools, SamplePrompts, GeneratedCode 
  } = req.body;

  const stmt = db.prepare(`
    UPDATE Agents
    SET AgentName = ?, Description = ?, ModelType = ?, DefaultPrompt = ?, SystemMessage = ?, 
        MaxTurns = ?, Temperature = ?, topP = ?, Tools = ?, SamplePrompts = ?, GeneratedCode = ?
    WHERE id = ?
  `);

  stmt.run(
    AgentName, Description, ModelType, DefaultPrompt, SystemMessage, 
    MaxTurns, Temperature, topP, Tools, SamplePrompts, GeneratedCode, id,
    function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send('Agent updated');
    }
  );

  stmt.finalize();
});

// Retrieve all agents
app.get('/agents', (req, res) => {
  db.all('SELECT * FROM Agents', (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
});

// Delete an agent
app.delete('/agents/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM Agents WHERE id = ?');
  stmt.run(id, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send('Agent deleted');
  });
  stmt.finalize();
});

// Save a new process
app.post('/processes', (req, res) => {
  const { ProcessName, Description } = req.body;

  const stmt = db.prepare(`
    INSERT INTO Processes (ProcessName, Description)
    VALUES (?, ?)
  `);

  stmt.run(ProcessName, Description, function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send('Process saved');
  });

  stmt.finalize();
});

// Update a process
app.put('/processes/:id', (req, res) => {
  const { id } = req.params;
  const { ProcessName, Description } = req.body;

  const stmt = db.prepare(`
    UPDATE Processes
    SET ProcessName = ?, Description = ?
    WHERE id = ?
  `);

  stmt.run(ProcessName, Description, id, function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send('Process updated');
  });

  stmt.finalize();
});

// Retrieve all processes
app.get('/processes', (req, res) => {
  db.all('SELECT * FROM Processes', (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
});

// Delete a process
app.delete('/processes/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM Processes WHERE id = ?');
  stmt.run(id, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send('Process deleted');
  });
  stmt.finalize();
});

// Save a new task
app.post('/tasks', (req, res) => {
  const { TaskName, Description } = req.body;

  const stmt = db.prepare(`
    INSERT INTO Tasks (TaskName, Description)
    VALUES (?, ?)
  `);

  stmt.run(TaskName, Description, function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send('Task saved');
  });

  stmt.finalize();
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { TaskName, Description } = req.body;

  const stmt = db.prepare(`
    UPDATE Tasks
    SET TaskName = ?, Description = ?
    WHERE id = ?
  `);

  stmt.run(TaskName, Description, id, function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send('Task updated');
  });

  stmt.finalize();
});

// Retrieve all tasks
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM Tasks', (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM Tasks WHERE id = ?');
  stmt.run(id, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send('Task deleted');
  });
  stmt.finalize();
});

// Save a new prompt
app.post('/prompts', (req, res) => {
  const { PromptName, Text } = req.body;

  const stmt = db.prepare(`
    INSERT INTO Prompts (PromptName, Text)
    VALUES (?, ?)
  `);

  stmt.run(PromptName, Text, function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send('Prompt saved');
  });

  stmt.finalize();
});

// Update a prompt
app.put('/prompts/:id', (req, res) => {
  const { id } = req.params;
  const { PromptName, Text } = req.body;

  const stmt = db.prepare(`
    UPDATE Prompts
    SET PromptName = ?, Text = ?
    WHERE id = ?
  `);

  stmt.run(PromptName, Text, id, function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send('Prompt updated');
  });

  stmt.finalize();
});

// Retrieve all prompts
app.get('/prompts', (req, res) => {
  db.all('SELECT * FROM Prompts', (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
});

// Delete a prompt
app.delete('/prompts/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM Prompts WHERE id = ?');
  stmt.run(id, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send('Prompt deleted');
  });
  stmt.finalize();
});

// Save a new tool
app.post('/tools', (req, res) => {
  const { ToolName, Description, GeneratedCode } = req.body;

  const stmt = db.prepare(`
    INSERT INTO Tools (ToolName, Description, GeneratedCode)
    VALUES (?, ?, ?)
  `);

  stmt.run(ToolName, Description, GeneratedCode, function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send('Tool saved');
  });

  stmt.finalize();
});

// Update a tool
app.put('/tools/:id', (req, res) => {
  const { id } = req.params;
  const { ToolName, Description, GeneratedCode } = req.body;

  const stmt = db.prepare(`
    UPDATE Tools
    SET ToolName = ?, Description = ?, GeneratedCode = ?
    WHERE id = ?
  `);

  stmt.run(ToolName, Description, GeneratedCode, id, function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send('Tool updated');
  });

  stmt.finalize();
});

// Retrieve all tools
app.get('/tools', (req, res) => {
  db.all('SELECT * FROM Tools', (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
});

// Delete a tool
app.delete('/tools/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM Tools WHERE id = ?');
  stmt.run(id, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send('Tool deleted');
  });
  stmt.finalize();
});

app.post('/models', (req, res) => {
  const { modelName, apiEndpoints, apiKey, description, modelType } = req.body;

  // Insert into Models table
  const insertModelStmt = db.prepare(`
    INSERT INTO Models (Name, Description, APIKey, ModelType)
    VALUES (?, ?, ?, ?)
  `);

  insertModelStmt.run(modelName, description, apiKey, modelType, function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }

    // Get the ID of the newly inserted model
    const modelId = this.lastID;

    // Insert into Model_Endpoints table
    const insertEndpointStmt = db.prepare(`
      INSERT INTO Model_Endpoints (modelId, EndpointType, EndpointURL)
      VALUES (?, ?, ?)
    `);

    for (const endpoint of apiEndpoints) {
      insertEndpointStmt.run(modelId, endpoint.type, endpoint.url);
    }

    insertEndpointStmt.finalize();
    res.send('Model and endpoints saved');
  });

  insertModelStmt.finalize();
});

app.put('/models/:id', (req, res) => {
  const { id } = req.params;
  const { modelName, apiEndpoints, apiKey, description, modelType } = req.body;

  // Update the model in Models table
  const updateModelStmt = db.prepare(`
    UPDATE Models
    SET Name = ?, Description = ?, APIKey = ?, ModelType = ?
    WHERE id = ?
  `);

  updateModelStmt.run(modelName, description, apiKey, modelType, id, function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }

    // Delete existing endpoints
    const deleteEndpointsStmt = db.prepare('DELETE FROM Model_Endpoints WHERE modelId = ?');
    deleteEndpointsStmt.run(id, function(deleteErr) {
      if (deleteErr) {
        return res.status(500).send(deleteErr.message);
      }

      // Insert new endpoints
      const insertEndpointStmt = db.prepare(`
        INSERT INTO Model_Endpoints (modelId, EndpointType, EndpointURL)
        VALUES (?, ?, ?)
      `);

      for (const endpoint of apiEndpoints) {
        insertEndpointStmt.run(id, endpoint.type, endpoint.url);
      }

      insertEndpointStmt.finalize();
      res.send('Model and endpoints updated');
    });
  });

  updateModelStmt.finalize();
});

app.get('/models', (req, res) => {
  db.all(`
    SELECT m.*, e.EndpointType, e.EndpointURL
    FROM Models m
    LEFT JOIN Model_Endpoints e ON m.id = e.modelId
  `, (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    // Organize data into models with nested endpoints
    const models = {};
    rows.forEach(row => {
      if (!models[row.id]) {
        models[row.id] = {
          id: row.id,
          name: row.Name,
          description: row.Description,
          apiKey: row.APIKey,
          modelType: row.ModelType,
          endpoints: []
        };
      }
      if (row.EndpointType && row.EndpointURL) {
        models[row.id].endpoints.push({
          type: row.EndpointType,
          url: row.EndpointURL
        });
      }
    });
    res.json(Object.values(models));
  });
});

app.delete('/models/:id', (req, res) => {
  const { id } = req.params;

  // Delete endpoints
  const deleteEndpointsStmt = db.prepare('DELETE FROM Model_Endpoints WHERE modelId = ?');
  deleteEndpointsStmt.run(id);

  // Delete model
  const deleteModelStmt = db.prepare('DELETE FROM Models WHERE id = ?');
  deleteModelStmt.run(id, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send('Model and associated endpoints deleted');
  });

  deleteEndpointsStmt.finalize();
  deleteModelStmt.finalize();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
