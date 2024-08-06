import { useState } from 'react';
import axios from 'axios';

const useModelManager = () => {
    const [modelName, setModelName] = useState('');
    const [apiEndpoints, setApiEndpoints] = useState([{ endpointType: '', endpointURL: '' }]);
    const [apiKey, setApiKey] = useState('');
    const [description, setDescription] = useState('');
    const [baseModel, setBaseModel] = useState('');
    const [baseModels] = useState([
        'GPT-2', 
        'GPT-3.5', 
        'GPT-4o', 
        'GPT-4o mini', 
        'Phi 3',
        'BERT', 
        'T5', 
        'RoBERTa', 
        'DistilBERT', 
        'XLNet', 
        'ALBERT', 
        'ELECTRA', 
        'GPT-Neo', 
        'GPT-J', 
        'Megatron-LM', 
        'BLOOM', 
        'DALL-E', 
        'CLIP', 
        'Codex', 
        'Anthropic', 
        'Gemini', 
        'PaLM', 
        'Mistral', 
        'Falcon', 
        'LLaMA', 
        'OPT'
    ]);
    const [error, setError] = useState(null);

    const endpointTypes = [
        { type: 'Completions', url: '/v1/completions' },
        { type: 'Chat Completions', url: '/v1/chat/completions' },
        { type: 'Edits', url: '/v1/edits' },
        { type: 'Embeddings', url: '/v1/embeddings' },
        { type: 'Moderation', url: '/v1/moderation' },
        { type: 'Image Generation', url: '/v1/images/generate' },
        { type: 'Image Editing', url: '/v1/images/edit' },
        { type: 'Image Variations', url: '/v1/images/variations' },
        { type: 'Video Generation', url: '/v1/videos/generate' },
        { type: 'Video Editing', url: '/v1/videos/edit' },
        { type: 'Audio Transcription', url: '/v1/audio/transcribe' },
        { type: 'Audio Translation', url: '/v1/audio/translate' },
        { type: 'Research', url: '/v1/research' },
        { type: 'Orchestration', url: '/v1/orchestration' },
        { type: 'Data Analysis', url: '/v1/data/analysis' },
        { type: 'Recommendation', url: '/v1/recommendation' },
        { type: 'Search', url: '/v1/search' },
        { type: 'Sentiment Analysis', url: '/v1/sentiment' },
        { type: 'Speech Synthesis', url: '/v1/speech/synthesize' },
        { type: 'Text to Speech', url: '/v1/text-to-speech' },
        { type: 'Speech to Text', url: '/v1/speech-to-text' },
        { type: 'Language Detection', url: '/v1/language/detect' },
        { type: 'Text Summarization', url: '/v1/summarization' },
        { type: 'Translation', url: '/v1/translation' },
        { type: 'Task Automation', url: '/v1/task/automation' },
        { type: 'Knowledge Base', url: '/v1/knowledge-base' }
    ];

    const handleAddEndpoint = () => {
        setApiEndpoints([...apiEndpoints, { endpointType: '', endpointURL: '' }]);
    };

    const handleEndpointChange = (index, field, value) => {
        const newEndpoints = [...apiEndpoints];
        newEndpoints[index][field] = value;
        setApiEndpoints(newEndpoints);
    };

    const handleSave = async () => {
        const newModel = {
            modelName,
            apiEndpoints,
            apiKey,
            description,
            baseModel
        };

        try {
            const response = await axios.post(`${process.env.DB_API_BASE_URL}/models`, newModel);
            console.log('Model saved:', response.data);
            // Clear the form after successful save
            setModelName('');
            setApiEndpoints([{ endpointType: '', endpointURL: '' }]);
            setApiKey('');
            setDescription('');
            setBaseModel('');
        } catch (err) {
            setError(err.message);
            console.error('Error saving model:', err);
        }
    };

    return {
        modelName,
        setModelName,
        apiEndpoints,
        setApiEndpoints,
        apiKey,
        setApiKey,
        description,
        setDescription,
        baseModel,
        setBaseModel,
        baseModels,
        endpointTypes,
        handleAddEndpoint,
        handleEndpointChange,
        handleSave,
        error
    };
};

export default useModelManager;
