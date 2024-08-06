const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define the path to your SQLite database file
const dbPath = path.resolve(__dirname, 'synthetiq.db');

// Create a new database file or open an existing one
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    createTables();
  }
});

// Function to create all the necessary tables
const createTables = () => {
  db.serialize(() => {
    // Create Agents table
    db.run(`
      CREATE TABLE IF NOT EXISTS Agents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        AgentName TEXT NOT NULL,
        Description TEXT,
        ModelType TEXT NOT NULL,
        DefaultPrompt TEXT,
        SystemMessage TEXT,
        MaxTurns INTEGER,
        Temperature REAL,
        topP REAL,
        Tools TEXT,
        SamplePrompts TEXT,
        GeneratedCode TEXT,
        CreatedDateTime TEXT DEFAULT CURRENT_TIMESTAMP,
        ModifiedDateTime TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating Agents table', err.message);
      }
    });

    // Create Processes table
    db.run(`
      CREATE TABLE IF NOT EXISTS Processes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ProcessName TEXT NOT NULL,
        Description TEXT,
        CreatedDateTime TEXT DEFAULT CURRENT_TIMESTAMP,
        ModifiedDateTime TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating Processes table', err.message);
      }
    });

    // Create Agents_Processes table
    db.run(`
      CREATE TABLE IF NOT EXISTS Agents_Processes (
        agent_id INTEGER,
        process_id INTEGER,
        FOREIGN KEY (agent_id) REFERENCES Agents(id),
        FOREIGN KEY (process_id) REFERENCES Processes(id),
        PRIMARY KEY (agent_id, process_id)
      )
    `, (err) => {
      if (err) {
        console.error('Error creating Agents_Processes table', err.message);
      }
    });

    // Create Tasks table
    db.run(`
      CREATE TABLE IF NOT EXISTS Tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        TaskName TEXT NOT NULL,
        Description TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Error creating Tasks table', err.message);
      }
    });

    // Create Processes_Tasks table
    db.run(`
      CREATE TABLE IF NOT EXISTS Processes_Tasks (
        process_id INTEGER,
        task_id INTEGER,
        FOREIGN KEY (process_id) REFERENCES Processes(id),
        FOREIGN KEY (task_id) REFERENCES Tasks(id),
        PRIMARY KEY (process_id, task_id)
      )
    `, (err) => {
      if (err) {
        console.error('Error creating Processes_Tasks table', err.message);
      }
    });

    // Create Prompts table
    db.run(`
      CREATE TABLE IF NOT EXISTS Prompts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        PromptName TEXT NOT NULL,
        Text TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Error creating Prompts table', err.message);
      }
    });

    // Create Tools table
    db.run(`
      CREATE TABLE IF NOT EXISTS Tools (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ToolName TEXT NOT NULL,
        Description TEXT,
        GeneratedCode TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Error creating Tools table', err.message);
      }
    });

    // Create Models table
    db.run(`
      CREATE TABLE IF NOT EXISTS Models (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL,
        Description TEXT,
        APIKey TEXT NOT NULL,
        ModelType TEXT,
        Version TEXT,
        AdditionalConfig TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Error creating Models table', err.message);
      }
    });

    // Create BaseModel table
    db.run(`
      CREATE TABLE IF NOT EXISTS BaseModel (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Error creating BaseModel table', err.message);
      } else {
        console.log('BaseModel table created successfully');
      }
    });

    // Create RequestType table
    db.run(`
      CREATE TABLE IF NOT EXISTS RequestType (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Error creating RequestType table', err.message);
      } else {
        console.log('RequestType table created successfully');
      }
    });

    // Create Model_Endpoints table
    db.run(`
      CREATE TABLE IF NOT EXISTS Model_Endpoints (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        modelId INTEGER NOT NULL,
        EndpointType TEXT NOT NULL,
        EndpointURL TEXT NOT NULL,
        FOREIGN KEY (modelId) REFERENCES Models (id)
      )
    `, (err) => {
      if (err) {
        console.error('Error creating Model_Endpoints table', err.message);
      } else {
        console.log('Model_Endpoints table created successfully');
      }
    });

    // Create Requests table
    db.run(`
      CREATE TABLE IF NOT EXISTS Requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        modelId INTEGER NOT NULL,
        requestTypeId INTEGER NOT NULL,
        baseModelId INTEGER NOT NULL,
        requestVerb TEXT NOT NULL,
        requestURL TEXT NOT NULL,
        requestBody TEXT,
        requestHeaders TEXT,
        FOREIGN KEY (modelId) REFERENCES Models (id),
        FOREIGN KEY (requestTypeId) REFERENCES RequestType (id),
        FOREIGN KEY (baseModelId) REFERENCES BaseModel (id)
      )
    `, (err) => {
      if (err) {
        console.error('Error creating Requests table', err.message);
      } else {
        console.log('Requests table created successfully');
      }
    });

    // Create Endpoint_Requests table
    db.run(`
      CREATE TABLE IF NOT EXISTS Endpoint_Requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        endpointId INTEGER NOT NULL,
        requestId INTEGER NOT NULL,
        FOREIGN KEY (endpointId) REFERENCES Model_Endpoints (id),
        FOREIGN KEY (requestId) REFERENCES Requests (id)
      )
    `, (err) => {
      if (err) {
        console.error('Error creating Endpoint_Requests table', err.message);
      } else {
        console.log('Endpoint_Requests table created successfully');
      }
    });

    // Populate RequestType table with example data
    const requestTypes = [
      'Analysis', 'Catalog', 'Store Directory', 'File Processing',
      'SAP Query', 'Shipping', 'Store Orders', 'Reports'
    ];

    requestTypes.forEach((type) => {
      db.run(`INSERT INTO RequestType (type) VALUES (?)`, [type], (err) => {
        if (err) {
          console.error(`Error inserting request type '${type}'`, err.message);
        } else {
          console.log(`Request type '${type}' inserted successfully`);
        }
      });
    });
  });
};

// Handle graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing the database connection', err.message);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});

module.exports = db;