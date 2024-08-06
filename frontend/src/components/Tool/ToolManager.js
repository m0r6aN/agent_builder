// ToolManager.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useFetchData from '../../hooks/useFetchData';
import useCrudOperations from '../../hooks/useCrudOperations';

const ToolManager = () => {
    const baseURL = process.env.DB_API_BASE_URL;
    const [toolName, setToolName] = useState('');
    const [toolDescription, setToolDescription] = useState('');
    const { data: tools, error } = useFetchData(`${baseURL}/tools`);
    const { addItem: addTool, deleteItem: deleteTool } = useCrudOperations(`${baseURL}/tools`);

    const handleSaveTool = () => {
        addTool({ toolName, toolDescription });
        setToolName('');
        setToolDescription('');
    };

    if (error) return <p>Error fetching tools: {error.message}</p>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Tool Manager</Typography>
            <TextField
                label="Tool Name"
                value={toolName}
                onChange={(e) => setToolName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Tool Description"
                value={toolDescription}
                onChange={(e) => setToolDescription(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" onClick={handleSaveTool} sx={{ mt: 2 }}>
                Save Tool
            </Button>
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Saved Tools:</Typography>
                {tools.map((tool) => (
                    <Box key={tool._id} sx={{ mt: 1, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
                        <Typography variant="h6">{tool.toolName}</Typography>
                        <Typography variant="body1">{tool.toolDescription}</Typography>
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteTool(tool._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ToolManager;
