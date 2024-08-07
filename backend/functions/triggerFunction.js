const { WorkflowsClient } = require('@google-cloud/workflows');
const client = new WorkflowsClient();

exports.triggerWorkflow = async (req, res) => {
  const { name } = req.query;
  const request = {
    name: `projects/YOUR_PROJECT_ID/locations/YOUR_LOCATION/workflows/${name}/executions`,
  };
  const [execution] = await client.createExecution(request);
  res.send(`Execution started: ${execution.name}`);
};
