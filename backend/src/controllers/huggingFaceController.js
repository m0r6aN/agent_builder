const { listModels } = require('@huggingface/hub');
const fetch = require('node-fetch');

const API_KEY = process.env.HUGGINGFACE_API_KEY;

async function isModelInferenceEnabled(modelId) {
    try {
        const response = await fetch(`https://api-inference.huggingface.co/status/${modelId}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });
        const data = await response.json();
        return data.state === 'Loadable';
    } catch (error) {
        console.error(`Error checking inference status for model ${modelId}:`, error);
        return false;
    }
}

const searchModels = async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        const models = [];

        for await (const model of listModels({
            credentials: {
                accessToken: API_KEY
            },
            search: {
                query
            }
        })) {
            if (await isModelInferenceEnabled(model.modelId)) {
                models.push(model);
            }
        }

        models.sort((model1, model2) => (model2.likes || 0) - (model1.likes || 0));
        const results = models.map(model => ({
            likes: model.likes || 0,
            url: `https://huggingface.co/${model.modelId}`
        }));
        
        res.json(results);
    } catch (error) {
        console.error('Error searching models:', error);
        res.status(500).json({ error: 'Failed to search models' });
    }
};

module.exports = {
    searchModels,
    // other Hugging Face operations
};
