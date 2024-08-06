import { useState } from 'react';

const generateFlaskAppCode = (modelId, apiKey, projectId, region, provider) => {
    if (provider === 'OpenAI') {
        return `
        from flask import Flask, request
        import openai

        app = Flask(__name__)

        # Replace with your OpenAI API key
        openai.api_key = "${apiKey}"

        # Replace with the ID of your OpenAI text completion model
        model_id = "${modelId}"

        # Function to call OpenAI Text Completion API
        def call_openai(prompt, temperature=0.7, top_p=0.9):
            """
            Calls OpenAI Text Completion API and returns the generated text.
            """
            response = openai.Completion.create(
                engine=model_id,
                prompt=prompt,
                temperature=temperature,
                max_tokens=100,
                top_p=top_p
            )
            return response.choices[0].text.strip()

        @app.route('/scrape', methods=['POST'])
        def scrape_web_content():
            """
            API endpoint for web scraping using an OpenAI model.
            """
            try:
                # Get the URL from the request body
                data = request.get_json()
                url = data.get("url")

                # Construct the prompt for the model
                prompt = f"Scrape all content from the following URL: {url}."

                # Call OpenAI to generate the scraped content
                scraped_content = call_openai(prompt)

                return {"content": scraped_content}, 200

            except Exception as e:
                print(f"Error scraping content: {e}")
                return {"error": "Failed to scrape content"}, 500

        if __name__ == '__main__':
            app.run(debug=True)  # Set debug to False for deployment
        `;
    } else if (provider === 'VertexAI') {
        return `
        from flask import Flask, request
        from google.cloud import vertex_ai

        app = Flask(__name__)

        # Replace with your Vertex AI endpoint project ID and region
        project_id = "${projectId}"
        region = "${region}"

        # Replace with the ID of your Vertex AI text completion model
        model_id = "${modelId}"

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
            try {
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
        `;
    } else {
        return '';
    }
};

const useCodeGeneration = () => {
    const [generatedCode, setGeneratedCode] = useState('');

    const generateCode = (modelId, apiKey, projectId, region, provider) => {
        const code = generateFlaskAppCode(modelId, apiKey, projectId, region, provider);
        setGeneratedCode(code);
    };

    return { generatedCode, generateCode };
};

export default useCodeGeneration;
