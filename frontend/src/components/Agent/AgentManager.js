import React, { useEffect } from 'react';
import { Box, Button, TextField, Typography, MenuItem, FormControl, Select, InputLabel, Checkbox, ListItemText, TextareaAutosize } from '@mui/material';
import AgentTester from './AgentTester';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CodeDisplay from '../Form/CodeDisplay';
import useCodeGeneration from '../../hooks/useCodeGeneration';
import useAgentManager from '../../hooks/useAgentManager';

const AgentManager = ({ agentsData, setAgentsData }) => {
    const {
        agentName,
        setAgentName,
        description,
        setDescription,
        modelId,
        setModelId,
        models,
        setModels,
        defaultPrompt,
        setDefaultPrompt,
        systemMessage,
        setSystemMessage,
        maxTurns,
        setMaxTurns,
        temperature,
        setTemperature,
        topP,
        setTopP,
        tools,
        setTools,
        selectedTool,
        setSelectedTool,
        samplePrompts,
        setSamplePrompts,
        agents,
        setAgents,
        showTester,
        setShowTester,
        tasks,
        setTasks,
        selectedTasks,
        setSelectedTasks,
        handleSave,
        handleClear,
        handleGenerate,
        handleTest,
        handleAddTool,
    } = useAgentManager();

    const { generatedCode, generateCode } = useCodeGeneration();

    useEffect(() => {
        if (agentsData) {
            setAgentName(agentsData.agentName);
            setDescription(agentsData.description);
            setModelId(agentsData.modelId);
            setModels(agentsData.models);
            setDefaultPrompt(agentsData.defaultPrompt);
            setSystemMessage(agentsData.systemMessage);
            setMaxTurns(agentsData.maxTurns);
            setTemperature(agentsData.temperature);
            setTopP(agentsData.topP);
            setTools(agentsData.tools);
            setSelectedTool(agentsData.selectedTool);
            setSamplePrompts(agentsData.samplePrompts);
            setAgents(agentsData.agents);
            setShowTester(agentsData.showTester);
            setTasks(agentsData.tasks);
            setSelectedTasks(agentsData.selectedTasks);
        }
    }, [agentsData, setAgentName, setDescription, setModelId, setModels, setDefaultPrompt, setSystemMessage, setMaxTurns, setTemperature, setTopP, setTools, setSelectedTool, setSamplePrompts, setAgents, setShowTester, setTasks, setSelectedTasks]);

    const saveData = () => {
        const newData = {
            agentName,
            description,
            modelId,
            models,
            defaultPrompt,
            systemMessage,
            maxTurns,
            temperature,
            topP,
            tools,
            selectedTool,
            samplePrompts,
            agents,
            showTester,
            tasks,
            selectedTasks,
        };
        setAgentsData(newData);
        handleSave();
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>AI Agent Manager</Typography>
            <TextField
                label="Agent Name"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Model</InputLabel>
                <Select
                    value={modelId}
                    onChange={(e) => setModelId(e.target.value)}
                >
                    {models.map((model) => (
                        <MenuItem key={model.id} value={model.id}>
                            {model.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Tasks</InputLabel>
                <Select
                    multiple
                    value={selectedTasks}
                    onChange={(e) => setSelectedTasks(e.target.value)}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Typography key={value}>{value}</Typography>
                            ))}
                        </Box>
                    )}
                >
                    {tasks.map((task) => (
                        <MenuItem key={task} value={task}>
                            <Checkbox checked={selectedTasks.indexOf(task) > -1} />
                            <ListItemText primary={task} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Default Prompt"
                value={defaultPrompt}
                onChange={(e) => setDefaultPrompt(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="System Message"
                value={systemMessage}
                onChange={(e) => setSystemMessage(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Max Turns"
                value={maxTurns}
                onChange={(e) => setMaxTurns(parseInt(e.target.value))}
                type="number"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Temperature"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                type="number"
                fullWidth
                margin="normal"
                inputProps={{ step: 0.1, min: 0, max: 1 }}
            />
            <TextField
                label="Top-p"
                value={topP}
                onChange={(e) => setTopP(parseFloat(e.target.value))}
                type="number"
                fullWidth
                margin="normal"
                inputProps={{ step: 0.1, min: 0, max: 1 }}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Tools</InputLabel>
                <Select
                    value={selectedTool}
                    onChange={(e) => setSelectedTool(e.target.value)}
                >
                    {toolOptions.map((tool) => (
                        <MenuItem key={tool} value={tool}>
                            {tool}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" onClick={handleAddTool} sx={{ mt: 2 }}>
                Add Tool
            </Button>
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Added Tools:</Typography>
                {tools.map((tool, index) => (
                    <Typography key={index} variant="body1">
                        {tool}
                    </Typography>
                ))}
            </Box>
            <TextareaAutosize
                aria-label="Sample Prompts"
                minRows={5}
                placeholder="Enter sample prompts here..."
                value={samplePrompts}
                onChange={(e) => setSamplePrompts(e.target.value)}
                style={{ width: '100%', marginTop: '16px', padding: '8px', borderRadius: '4px', borderColor: '#c4c4c4' }}
            />
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={handleGenerate} sx={{ mr: 1 }}>
                    Generate
                </Button>
                <Button variant="contained" onClick={saveData} sx={{ mr: 1 }}>
                    Save
                </Button>
                <Button variant="contained" onClick={handleClear} sx={{ mr: 1 }}>
                    Clear
                </Button>
                <Button variant="contained" onClick={handleTest} sx={{ mr: 1 }}>
                    Test
                </Button>
            </Box>
            <CodeDisplay>{generatedCode}</CodeDisplay>
            {showTester && <AgentTester generatedCode={generatedCode} />}
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Sample Prompts</Typography>
            <Box sx={{ mt: 1, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
                <Typography variant="body1" component="div">
                    {samplePrompts.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </Typography>
            </Box>
        </Box>
    );
};

export default AgentManager;
