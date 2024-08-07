const express = require('express');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const cors = require('./middleware/cors');

const agentRoutes = require('./routes/agentRoutes');
const processRoutes = require('./routes/processRoutes');
const taskRoutes = require('./routes/taskRoutes');
const promptRoutes = require('./routes/promptRoutes');
const toolRoutes = require('./routes/toolRoutes');
const modelRoutes = require('./routes/modelRoutes');

const app = express();
app.use(express.json()); // Built-in JSON parser
app.use(logger);
app.use(cors);

// Use auth middleware globally
app.use(auth);

// Use routes
app.use('/api', agentRoutes);
app.use('/api', processRoutes);
app.use('/api', taskRoutes);
app.use('/api', promptRoutes);
app.use('/api', toolRoutes);
app.use('/api', modelRoutes);

// Use error handler middleware
app.use(errorHandler);

module.exports = app;
