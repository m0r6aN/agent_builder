import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const AgentTester = ({ generatedCode }) => {
  const [prompt, setPrompt] = useState('');

  const handleTest = () => {
    // Implement the test functionality
    console.log('Testing with prompt:', prompt);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Tester</Typography>
      {generatedCode && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>Python Code</Typography>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
            {generatedCode}
          </pre>
        </Box>
      )}
      <TextField
        label="Prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleTest} sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default AgentTester;
