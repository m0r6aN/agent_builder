import { useState } from 'react';
import useFetchData from './useFetchData';
import useCrudOperations from './useCrudOperations';

const usePromptManager = (baseURL) => {
    const [promptName, setPromptName] = useState('');
    const [promptDescription, setPromptDescription] = useState('');
    const { data: prompts, error, isLoading } = useFetchData(`${baseURL}/prompts`);
    const { addItem: addPrompt, deleteItem: deletePrompt } = useCrudOperations(`${baseURL}/prompts`);

    const handleSavePrompt = () => {
        addPrompt({ promptName, promptDescription });
        setPromptName('');
        setPromptDescription('');
    };

    return {
        promptName,
        setPromptName,
        promptDescription,
        setPromptDescription,
        prompts,
        error,
        isLoading,
        handleSavePrompt,
        deletePrompt
    };
};

export default usePromptManager;