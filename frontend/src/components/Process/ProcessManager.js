import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem, IconButton, CircularProgress, Alert, AlertTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useApi from '../../hooks/useApi';
import useProcessManager from '../../hooks/useProcessManager';

const ProcessManager = ({ processData, setProcessData }) => {
    const baseURL = process.env.REACT_APP_DB_API_BASE_URL;
    const { data: agents, error: agentsError, isLoading: agentsLoading } = useApi(`${baseURL}/agents`);
    const { data: processes, error: processesError, fetchData: fetchProcesses, isLoading: processesLoading } = useApi(`${baseURL}/processes`);
    const { processName, setProcessName, processAgents, handleAddAgent, handleSaveProcess, handleDeleteProcess } = useProcessManager([]);

    const [selectedAgent, setSelectedAgent] = useState('');
    const [task, setTask] = useState('');

    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (processData) {
            setProcessName(processData.processName);
            // Set other process-specific data as needed
        }
    }, [processData, setProcessName]);

    useEffect(() => {
        if (agentsError) setErrorMessage(`Error loading agents: ${agentsError.message}`);
        if (processesError) setErrorMessage(`Error loading processes: ${processesError.message}`);
    }, [agentsError, processesError]);

    const handleAddAgentToProcess = () => {
        if (!selectedAgent || !task) {
            setErrorMessage('Please select an agent and enter a task description.');
            return;
        }
        handleAddAgent(selectedAgent, task);
        setSelectedAgent('');
        setTask('');
        setErrorMessage(null);
    };

    const handleSaveNewProcess = async () => {
        const newProcess = await handleSaveProcess();
        if (newProcess) {
            fetchProcesses();  // Refresh process list
        }
    };

    const saveData = () => {
        const newData = {
            processName,
            processAgents,
        };
        setProcessData(newData);
        handleSaveNewProcess();
    };

    if (agentsLoading || processesLoading) return <CircularProgress />;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Process Manager</Typography>

            {errorMessage && (
                <Alert severity="error" onClose={() => setErrorMessage(null)}>
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                </Alert>
            )}

            <TextField
                label="Process Name"
                value={processName}
                onChange={(e) => setProcessName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Agents</InputLabel>
                <Select
                    value={selectedAgent}
                    onChange={(e) => setSelectedAgent(e.target.value)}
                >
                    {agents && agents.map((agent) => (
                        <MenuItem key={agent._id} value={agent._id}>
                            {agent.agentName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Task Description"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" onClick={handleAddAgentToProcess} sx={{ mt: 2 }}>
                Add Agent to Process
            </Button>
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Agents in Process:</Typography>
                {processAgents.map((processAgent, index) => (
                    <Typography key={index} variant="body1">
                        Agent: {agents.find(agent => agent._id === processAgent.agent)?.agentName}, Task: {processAgent.task}
                    </Typography>
                ))}
            </Box>
            <Button variant="contained" onClick={saveData} sx={{ mt: 2 }}>
                Save Process
            </Button>
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Saved Processes:</Typography>
                {processes && processes.map((process) => (
                    <Box key={process._id} sx={{ mt: 1, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
                        <Typography variant="h6">{process.processName}</Typography>
                        {process.processAgents.map((pa, idx) => (
                            <Typography key={idx} variant="body1">
                                Agent: {agents.find(agent => agent._id === pa.agent)?.agentName}, Task: {pa.task}
                            </Typography>
                        ))}
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProcess(process._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ProcessManager;
