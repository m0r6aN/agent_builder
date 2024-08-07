import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import useModelManager from './useModelManager';
import { useHistory } from 'react-router-dom';

const ModelManager = () => {
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();
    const { fetchModels } = useModelManager();

    useEffect(() => {
        const loadModels = async () => {
            try {
                const fetchedModels = await fetchModels();
                setModels(fetchedModels);
            } catch (err) {
                setError('Failed to load models.');
            } finally {
                setLoading(false);
            }
        };
        loadModels();
    }, [fetchModels]);

    const handleAddNewModel = () => {
        history.push('/model-search');
    };

    const handleChange = (selectedOption) => {
        setSelectedModel(selectedOption);
    };

    return (
        <div>
            <h2>Model Manager</h2>
            {loading && <p>Loading models...</p>}
            {error && <p>{error}</p>}
            <Select
                options={models.map(model => ({ value: model.id, label: `${model.name} - ${model.description}` }))}
                onChange={handleChange}
                placeholder="Select a model"
                isClearable
                value={selectedModel ? { value: selectedModel.value, label: selectedModel.label } : null}
            />
            <button onClick={handleAddNewModel}>Add New Model</button>
        </div>
    );
};

export default ModelManager;
