import React, { useEffect } from 'react';
import { Box, Button, Typography, TextField, IconButton, CircularProgress, Alert, AlertTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import usePromptManager from '../../hooks/usePromptManager';
import PromptOptimizer from './PromptOptimizer';

const PromptManager = ({ promptsData, setPromptsData }) => {
    const baseURL = process.env.REACT_APP_DB_API_BASE_URL;
    const {
        promptName,
        setPromptName,
        promptDescription,
        setPromptDescription,
        prompts,
        error,
        isLoading,
        handleSavePrompt,
        deletePrompt
    } = usePromptManager(baseURL);

    useEffect(() => {
        if (promptsData) {
            setPromptName(promptsData.promptName);
            setPromptDescription(promptsData.promptDescription);
        }
    }, [promptsData, setPromptName, setPromptDescription]);

    const saveData = () => {
        const newData = {
            promptName,
            promptDescription,
        };
        setPromptsData(newData);
        handleSavePrompt();
    };

    if (isLoading) return <CircularProgress />;
    if (error) return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error.message}
        </Alert>
    );

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Prompt Manager</Typography>
            <PromptOptimizer />
            <TextField
                label="Prompt Name"
                value={promptName}
                onChange={(e) => setPromptName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Prompt Description"
                value={promptDescription}
                onChange={(e) => setPromptDescription(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" onClick={saveData} sx={{ mt: 2 }}>
                Save Prompt
            </Button>
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Saved Prompts:</Typography>
                {prompts.map((prompt) => (
                    <Box key={prompt._id} sx={{ mt: 1, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
                        <Typography variant="h6">{prompt.promptName}</Typography>
                        <Typography variant="body1">{prompt.promptDescription}</Typography>
                        <IconButton edge="end" aria-label="delete" onClick={() => deletePrompt(prompt._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default PromptManager;
