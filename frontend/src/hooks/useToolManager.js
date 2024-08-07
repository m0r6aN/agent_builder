import { useState } from 'react';
import useFetchData from './useFetchData';
import useCrudOperations from './useCrudOperations';

const useToolManager = (baseURL) => {
    const [toolName, setToolName] = useState('');
    const [toolDescription, setToolDescription] = useState('');
    const { data: tools, error, isLoading } = useFetchData(`${baseURL}/tools`);
    const { addItem: addTool, deleteItem: deleteTool } = useCrudOperations(`${baseURL}/tools`);

    const handleSaveTool = () => {
        addTool({ toolName, toolDescription });
        setToolName('');
        setToolDescription('');
    };

    return {
        toolName,
        setToolName,
        toolDescription,
        setToolDescription,
        tools,
        error,
        isLoading,
        handleSaveTool,
        deleteTool
    };
};

export default useToolManager;
