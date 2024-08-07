# SynthetIQ Backend

## Introduction
The backend server for the SynthetIQ Framework, built with Node.js and SQLite.

## Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/synthetiq-framework.git
   cd backend

    npm install

    npm start

# API Endpoints
    * /api/agents: CRUD operations for agents.
    * /api/models: CRUD operations for models.
    * /api/tasks: CRUD operations for tasks.

# Testing
npm test

**User Guide**:
```markdown
# SynthetIQ User Guide

## Introduction
The SynthetIQ Framework is designed to streamline the creation and management of intelligent multi-agent processes.

## Getting Started
### Prerequisites
- Node.js
- Docker
- Kubernetes (GKE)

### Installation
1. Clone the repository:
   ``` sh
   git clone https://github.com/your-repo/synthetiq-framework.git
    ```

## Usage
### Managing Agents
    Navigate to the Agents page to create, update, or delete agents.

### Managing Models
    Use the Models page to manage AI models.

### Testing Agents
    Use the AgentTester component to test the functionality of your agents.

### Deployment
    Use the provided CI/CD pipeline configuration for automated deployment.
    Kubernetes deployment configuration can be found in k8s/deployment.yaml.

## Backend Structure

backend/
├── src/
│   ├── controllers/
│   │   ├── agentController.js
│   │   ├── processController.js
│   │   ├── taskController.js
│   │   ├── promptController.js
│   │   ├── toolController.js
│   │   ├── modelController.js
│   ├── middleware/
│   │   ├── logger.js
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── validate.js
│   │   ├── cors.js
│   ├── models/
│   │   ├── agentModel.js
│   │   ├── processModel.js
│   │   ├── taskModel.js
│   │   ├── promptModel.js
│   │   ├── toolModel.js
│   │   ├── modelModel.js
│   ├── routes/
│   │   ├── agentRoutes.js
│   │   ├── processRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── promptRoutes.js
│   │   ├── toolRoutes.js
│   │   ├── modelRoutes.js
│   ├── app.js
│   ├── config.js
│   ├── server.js
├── db/
│   ├── schema.sql
│   ├── db.js
├── Dockerfile
├── package.json
└── README.md

This setup includes logging, authentication, error handling, request validation, and CORS handling. Each route has validation middleware to ensure the incoming data is correct before it reaches the controller logic. The auth middleware protects routes and ensures that only authenticated users can access them.

#### Deploy and Expose Endpoint

1. Build and Push Docker Images:
```sh
docker build -t gcr.io/your-project-id/agent:latest -f docker/Dockerfile.agent .
docker push gcr.io/your-project-id/agent:latest
```

2. Deploy to GKE:
```sh
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

3. Deploy Cloud Workflows:
```
gcloud workflows deploy YOUR_WORKFLOW_NAME --source=workflows/workflow.yaml --location=YOUR_LOCATION
```

4. Deploy Cloud Function:
```
gcloud functions deploy triggerFunction --runtime nodejs14 --trigger-http --allow-unauthenticated
```

#### Expose and Trigger the Process
Use the Cloud Function's URL to trigger the workflow:
```sh
curl https://YOUR_CLOUD_FUNCTION_URL?name=YOUR_WORKFLOW_NAME

```

By following these steps, you can create a fully orchestrated process that runs on GCP, with endpoints to trigger the process, containerized agents, and a managed workflow to control the sequence of operations.