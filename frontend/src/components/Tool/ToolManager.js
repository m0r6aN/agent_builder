import React, { useEffect } from 'react';
import { Box, Button, TextField, Typography, IconButton, CircularProgress, Alert, AlertTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useToolManager from '../../hooks/useToolManager';

const ToolManager = ({ toolsData, setToolsData }) => {
    const baseURL = process.env.REACT_APP_DB_API_BASE_URL;
    const {
        toolName,
        setToolName,
        toolDescription,
        setToolDescription,
        tools,
        error,
        isLoading,
        handleSaveTool,
        deleteTool
    } = useToolManager(baseURL);

    useEffect(() => {
        if (toolsData) {
            setToolName(toolsData.toolName);
            setToolDescription(toolsData.toolDescription);
        }
    }, [toolsData, setToolName, setToolDescription]);

    const saveData = () => {
        const newData = {
            toolName,
            toolDescription,
        };
        setToolsData(newData);
        handleSaveTool();
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
            <Button variant="contained" onClick={saveData} sx={{ mt: 2 }}>
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
