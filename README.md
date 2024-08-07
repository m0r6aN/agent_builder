# SynthetIQ

## Description
SynthetIQ is a flexible and extensible framework designed for creating, managing, and testing AI agents. These agents can perform various tasks, such as web scraping, research, and content creation, utilizing different tools like Google Search and Wikipedia Search. SynthetIQ allows users to define agents using prompts, assign them tools, and manage their configurations. The project supports persistence through local storage, making it easy to save and retrieve agent configurations.

## Usage Instructions

### Setup
#### 1. Clone the repository:

```sh
git clone <repository-url>
cd SynthetIQ
```
#### 2. Install dependencies:

```sh
npm install
```

#### 3. Run the application:
```sh
npm start
```


## Adding a New Agent

1. Navigate to the "Agent Manager" page.
2. Fill in the agent details, such as name, description, default prompt, system message, and parameters (max turns, temperature, top-p).
3. Select a base model from the dropdown list of available base models.
4. Select and add tools to the agent.
5. Enter sample prompts for reference.
6. Generate, save, clear, or test the agent using the respective buttons.

## Adding a New Base Model

1. Navigate to the "Model Manager" page.
2. Fill in the model details, such as model name, description, API key, and base model.
3. Add one or more API endpoints, specifying the type and URL for each endpoint.
4. Save the model configuration using the "Save Model" button.

## Example Simple Use
### Creating a Simple Web Scraper Agent
1. Agent Name: Web Scraper
2. Description: Extracts and returns web page content from specified URLs.
3. Default Prompt: "Scrape all content from the following URL: [URL]."
4. System Message: "Ready to scrape web content."
5. Tools: Add GoogleSearchTool
6. Sample Prompts
    * Scrape all content from the following URL: [URL].
    * Fetch the HTML source code for the page at [URL].
    * Extract all elements with the attribute [attribute] from the page at [URL].
    * Return content of elements with class [class] from [URL].

## Processes
Processes are workflows or sequences of operations that involve one or more Agents. For example, a Process could be "Customer Support Automation," where different Agents handle various parts of the workflow (e.g., initial response, troubleshooting, follow-up).

### Example Simple Process
Process Name: Data Fetch and Analysis
Agents Involved:

DataFetcherAgent:
    * Task: Fetch data from an external API.

DataAnalyzerAgent:
    * Task: Analyze the fetched data and generate a summary report.

Orchestrator Agent:
    * Task: Manages the sequence of the agents: 
            * Triggers the DataFetcherAgent to fetch data.
            * Once the data is fetched, triggers the DataAnalyzerAgent to analyze the data and generate a summary report.

## Agents
These are individual entities that perform specific tasks within a Process. Agents could be specialized in different areas, such as handling customer queries or analyzing data.

## Tasks 
These are specific actions or responsibilities that Agents need to perform. An Agent might be assigned several Tasks within a Process.

### So in practice:

A Process refers to a structured workflow comprising various agents and tasks aimed at achieving a specific goal. It includes defining the process name and type, configuring agents (pre-defined or custom), specifying tasks and their configurations, assigning agents to tasks, and orchestrating their execution. The process also involves setting up error handling, generating the necessary code, and providing deployment instructions. Essentially, it is a comprehensive plan that outlines the steps and components required to perform a complex operation or series of operations within the system.

* A Process involves multiple Agents working together.
* An Agent can be involved in one or more Processes.
* Tasks are assigned to Agents within the context of a Process to complete the workflow.

* Process objects can hold references to multiple Agents and their respective Tasks.
* Agent objects can have a list of Tasks they are capable of performing.
* Task objects can be associated with specific Agents and Processes.

## Example Simple Process
### Process Name: Data Fetch and Analysis

#### Agents Involved:
1. DataFetcherAgent
    * Task: Fetch data from an external API.
2. DataAnalyzerAgent
    * Task: Analyze the fetched data and generate a summary report.
3. Orchestrator Agent: 
    * Manages the sequence of the agents:

First, it triggers the DataFetcherAgent to fetch data.
Once the data is fetched, it triggers the DataAnalyzerAgent to analyze the data and generate a summary report.

#### Prompt
Research the latest advancements in quantum computing and write a summary.
Use Google Search to find recent papers on quantum computing and extract key points.
Fetch the HTML source of the Wikipedia page for quantum computing and summarize it.
Calculate the impact of quantum computing on current encryption methods.

## Complex Process

### Process Name: Customer Support Workflow
#### Description: 
This process handles a customer support ticket by analyzing the issue, providing a solution, and following up with the customer.

#### Agents Involved:
1. IssueAnalyzerAgent
    * Task: Analyze the customer's issue and classify it.
2. SolutionProviderAgent
    * Task: Provide a solution based on the issue classification.
3. FollowUpAgent
    * Task: Follow up with the customer to ensure the issue is resolved and gather feedback.
4. Orchestrator Agent: 
    * Task: Manages the entire workflow:
        * It triggers the IssueAnalyzerAgent to analyze and classify the issue.
        * Once classified, it triggers the SolutionProviderAgent to provide a solution.
        * After providing the solution, it triggers the FollowUpAgent to follow up with the customer.

#### Prompt
You are managing a customer support workflow. Your goal is to handle a customer support ticket from initial analysis to resolution and follow-up. Follow the steps below to complete the process:

1. **Analyze the Issue:**
   - Read the customer’s issue description carefully.
   - Identify the key problems or questions.
   - Classify the issue into a category (e.g., billing, technical support, product inquiry).

2. **Provide a Solution:**
   - Based on the classification, generate a solution or response.
   - If necessary, retrieve relevant information or resources to provide a comprehensive answer.
   - Ensure the solution addresses the customer’s concerns effectively.

3. **Follow-Up:**
   - After sending the solution, follow up with the customer.
   - Confirm that the issue has been resolved to their satisfaction.
   - Request feedback on the support experience to improve future interactions.

4. **Orchestrate the Workflow:**
   - Ensure each step is performed in the correct order.
   - Manage the handoff between analyzing the issue, providing the solution, and following up.
   - Track the progress and ensure timely completion of each step.

**Additional Instructions:**
- If the issue requires escalation or additional assistance, indicate the next steps for involving higher support tiers or additional resources.
- Maintain a professional and empathetic tone throughout the interaction.

## Updated AgentManager Component
The `AgentManager` component now allows users to assign one of the base models they have created, and generates more comprehensive code for the `execute` and `query` methods.

### Example of Generated Code
```python
from flask import Flask, request
from google.cloud import vertex_ai

app = Flask(__name__)

# Replace with your Vertex AI endpoint project ID and region
project_id = "your-project-id"
region = "your-region"

# Replace with the ID of your Vertex AI text completion model
model_id = "your-model-id"

# Function to call Vertex AI Text Completion API
def call_vertex_ai(prompt, temperature=0.7, top_p=0.9):
  """
  Calls Vertex AI Text Completion API and returns the generated text.
  """
  endpoint = vertex_ai.Endpoint(project=project_id, location=region, model=model_id)
  response = endpoint.predict(instances=[{"content": prompt}])
  return response.predictions[0].content

@app.route('/scrape', methods=['POST'])
def scrape_web_content():
  """
  API endpoint for web scraping using a Vertex AI model.
  """
  try:
    # Get the URL from the request body
    data = request.get_json()
    url = data.get("url")

    # Construct the prompt for the model
    prompt = f"Scrape all content from the following URL: {url}."

    # Call Vertex AI to generate the scraped content
    scraped_content = call_vertex_ai(prompt)

    return {"content": scraped_content}, 200

  except Exception as e:
    print(f"Error scraping content: {e}")
    return {"error": "Failed to scrape content"}, 500

if __name__ == '__main__':
  app.run(debug=True)  # Set debug to False for deployment
```
