// PromptManager.js
import React, { useState } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useFetchData from '../../hooks/useFetchData';
import useCrudOperations from '../../hooks/useCrudOperations';
import PromptOptimizer from './PromptOptimizer';

const PromptManager = () => {
    const baseURL = process.env.DB_API_BASE_URL;
    const [promptName, setPromptName] = useState('');
    const [promptDescription, setPromptDescription] = useState('');
    const { data: prompts, error } = useFetchData(`${baseURL}/prompts`);
    const { addItem: addPrompt, deleteItem: deletePrompt } = useCrudOperations(`${baseURL}/prompts`);

    const handleSavePrompt = () => {
        addPrompt({ promptName, promptDescription });
        setPromptName('');
        setPromptDescription('');
    };

    if (error) return <p>Error fetching prompts: {error.message}</p>;

    return (
        <Box sx={{ p: 3 }}>
            <PromptOptimizer />
            <Button variant="contained" onClick={handleSavePrompt} sx={{ mt: 2 }}>
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
