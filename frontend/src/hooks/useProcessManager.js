// hooks/useProcessManager.js
import { useState } from 'react';
import axios from 'axios';

const useProcessManager = (initialProcesses) => {
    const [processName, setProcessName] = useState('');
    const [processAgents, setProcessAgents] = useState(initialProcesses);

    const handleAddAgent = (selectedAgent, task) => {
        if (selectedAgent && task) {
            const newProcessAgent = { agent: selectedAgent, task };
            setProcessAgents([...processAgents, newProcessAgent]);
        }
    };

    const handleSaveProcess = async () => {
        const newProcess = {
            processName,
            processAgents,
        };

        try {
            const response = await axios.post('http://localhost:5000/processes', newProcess);
            return response.data;
        } catch (error) {
            console.error('Failed to save process:', error);
        }
    };

    const handleDeleteProcess = async (processId) => {
        try {
            await axios.delete(`http://localhost:5000/processes/${processId}`);
            setProcessAgents(processAgents.filter(process => process._id !== processId));
        } catch (error) {
            console.error('Failed to delete process:', error);
        }
    };

    return { processName, setProcessName, processAgents, handleAddAgent, handleSaveProcess, handleDeleteProcess };
};

export default useProcessManager;
