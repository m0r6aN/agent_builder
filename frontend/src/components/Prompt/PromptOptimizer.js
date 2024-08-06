import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const PromptOptimizer = () => {
    const [promptName, setPromptName] = useState('');
    const [promptText, setPromptText] = useState('');
    const [optimizedPrompt, setOptimizedPrompt] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOptimizePrompt = async () => {
        setLoading(true);
        try {
            // Replace '/api/optimizePrompt' with the actual endpoint for optimizing prompts
            const response = await axios.post('/api/optimizePrompt', { promptText });
            setOptimizedPrompt(response.data.optimizedPrompt);
        } catch (error) {
            console.error('Error optimizing prompt', error);
        }
        setLoading(false);
    };

    return (
        <Box sx={{ p: 3 }}>           
            <TextField
                label="Prompt Name"
                value={promptName}
                onChange={(e) => setPromptName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Prompt Text"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
            />
            <Box sx={{ mt: 2 }}>
                <Button 
                    variant="contained" 
                    onClick={handleOptimizePrompt}
                    disabled={loading}
                >
                    {loading ? 'Optimizing...' : 'Optimize Prompt'}
                </Button>
            </Box>
            {optimizedPrompt && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>Optimized Prompt</Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={optimizedPrompt}
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                    />
                </Box>
            )}
        </Box>
    );
};

export default PromptOptimizer;
