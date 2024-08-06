import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const CodeDisplay = ({ generatedCode }) => {
    const copyCode = () => {
        navigator.clipboard.writeText(generatedCode)
            .then(() => {
                alert('Code copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy code: ', err);
            });
    };

    return (
        generatedCode && (
            <Box sx={{ mt: 3 }}>
                <Typography variant="h5" gutterBottom>Generated Code</Typography>
                <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
                    {generatedCode}
                </pre>
                <Button 
                    variant="contained" 
                    onClick={copyCode} 
                    sx={{ mt: 2 }}
                >
                    Copy Code
                </Button>
            </Box>
        )
    );
};

export default CodeDisplay;
