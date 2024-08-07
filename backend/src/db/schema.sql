-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Agents table
CREATE TABLE IF NOT EXISTS agents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  name TEXT NOT NULL,
  description TEXT,
  model_type TEXT NOT NULL,
  default_prompt TEXT,
  system_message TEXT,
  max_turns INTEGER,
  temperature REAL,
  top_p REAL,
  tools TEXT,
  sample_prompts TEXT,
  generated_code TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Processes table
CREATE TABLE IF NOT EXISTS processes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  process_name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Agents_Processes table
CREATE TABLE IF NOT EXISTS agents_processes (
  agent_id INTEGER,
  process_id INTEGER,
  FOREIGN KEY (agent_id) REFERENCES agents(id),
  FOREIGN KEY (process_id) REFERENCES processes(id),
  PRIMARY KEY (agent_id, process_id)
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Processes_Tasks table
CREATE TABLE IF NOT EXISTS processes_tasks (
  process_id INTEGER,
  task_id INTEGER,
  FOREIGN KEY (process_id) REFERENCES processes(id),
  FOREIGN KEY (task_id) REFERENCES tasks(id),
  PRIMARY KEY (process_id, task_id)
);

-- Prompts table
CREATE TABLE IF NOT EXISTS prompts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  prompt_name TEXT NOT NULL,
  text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tools table
CREATE TABLE IF NOT EXISTS tools (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tool_name TEXT NOT NULL,
  description TEXT,
  generated_code TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Models table
CREATE TABLE IF NOT EXISTS models (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  api_key TEXT NOT NULL,
  model_type TEXT,
  version TEXT,
  additional_config TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BaseModel table
CREATE TABLE IF NOT EXISTS base_model (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

-- RequestType table
CREATE TABLE IF NOT EXISTS request_type (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL
);

-- Model_Endpoints table
CREATE TABLE IF NOT EXISTS model_endpoints (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  model_id INTEGER NOT NULL,
  endpoint_type TEXT NOT NULL,
  endpoint_url TEXT NOT NULL,
  FOREIGN KEY (model_id) REFERENCES models(id)
);

-- Requests table
CREATE TABLE IF NOT EXISTS requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  model_id INTEGER NOT NULL,
  request_type_id INTEGER NOT NULL,
  base_model_id INTEGER NOT NULL,
  request_verb TEXT NOT NULL,
  request_url TEXT NOT NULL,
  request_body TEXT,
  request_headers TEXT,
  FOREIGN KEY (model_id) REFERENCES models(id),
  FOREIGN KEY (request_type_id) REFERENCES request_type(id),
  FOREIGN KEY (base_model_id) REFERENCES base_model(id)
);

-- Endpoint_Requests table
CREATE TABLE IF NOT EXISTS endpoint_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  endpoint_id INTEGER NOT NULL,
  request_id INTEGER NOT NULL,
  FOREIGN KEY (endpoint_id) REFERENCES model_endpoints(id),
  FOREIGN KEY (request_id) REFERENCES requests(id)
);

-- Populate RequestType table with example data
INSERT INTO request_type (type) VALUES ('Analysis');
INSERT INTO request_type (type) VALUES ('Catalog');
INSERT INTO request_type (type) VALUES ('Store Directory');
INSERT INTO request_type (type) VALUES ('File Processing');
INSERT INTO request_type (type) VALUES ('SAP Query');
INSERT INTO request_type (type) VALUES ('Shipping');
INSERT INTO request_type (type) VALUES ('Store Orders');
INSERT INTO request_type (type) VALUES ('Reports');
