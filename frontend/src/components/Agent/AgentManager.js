import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Typography, TextareaAutosize, Select, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';
import AgentTester from './AgentTester';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CodeDisplay from '../Form/CodeDisplay';
import useCodeGeneration from '../hooks/useCodeGeneration';

const AgentManager = () => {
    const [agentName, setAgentName] = useState('');
    const [description, setDescription] = useState('');
    const [modelId, setModelId] = useState('');
    const [models, setModels] = useState([]);
    const [defaultPrompt, setDefaultPrompt] = useState('');
    const [systemMessage, setSystemMessage] = useState('');
    const [maxTurns, setMaxTurns] = useState(5);
    const [temperature, setTemperature] = useState(0.7);
    const [topP, setTopP] = useState(0.9);
    const [tools, setTools] = useState([]);
    const [selectedTool, setSelectedTool] = useState('');
    const [samplePrompts, setSamplePrompts] = useState('');
    const [agents, setAgents] = useState([]);
    const [showTester, setShowTester] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);

    const { generatedCode, generateCode } = useCodeGeneration();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch models
                const modelResponse = await axios.get('/api/models');
                setModels(modelResponse.data);

                // Fetch tasks
                const tasksResponse = await axios.get('/api/tasks');
                setTasks(tasksResponse.data);

                // Load saved agents from localStorage
                const storedAgents = JSON.parse(localStorage.getItem('agents')) || [];
                setAgents(storedAgents);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    const handleSave = () => {
        const newAgent = {
            agentName,
            description,
            modelId,
            defaultPrompt,
            systemMessage,
            maxTurns,
            temperature,
            topP,
            tools,
            tasks: selectedTasks,
            samplePrompts,
            generatedCode
        };
        const updatedAgents = [...agents, newAgent];
        setAgents(updatedAgents);
        localStorage.setItem('agents', JSON.stringify(updatedAgents));
        console.log('Agent saved');
    };

    const handleClear = () => {
        setAgentName('');
        setDescription('');
        setModelId('');
        setDefaultPrompt('');
        setSystemMessage('');
        setMaxTurns(5);
        setTemperature(0.7);
        setTopP(0.9);
        setTools([]);
        setSamplePrompts('');
        setSelectedTasks([]);
        setShowTester(false);
    };

    const handleGenerate = () => {
        const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // OpenAI API key from environment variable
        const projectId = process.env.REACT_APP_VERTEX_AI_PROJECT_ID; // Vertex AI Project ID
        const region = process.env.REACT_APP_VERTEX_AI_REGION; // Vertex AI region
        const provider = process.env.REACT_APP_PROVIDER; // 'OpenAI' or 'VertexAI'

        generateCode(modelId, apiKey, projectId, region, provider);
    };

    const handleTest = () => {
        setShowTester(true);
    };

    const handleAddTool = () => {
        if (selectedTool && !tools.includes(selectedTool)) {
            setTools([...tools, selectedTool]);
            setSelectedTool('');
        }
    };

    const toolOptions = ['GoogleSearchTool', 'WikipediaSearchTool', 'CalculatorTool'];

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
                <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>
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
