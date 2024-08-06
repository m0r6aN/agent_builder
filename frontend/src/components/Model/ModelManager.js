import React from 'react';
import { Box, Button, TextField, Typography, InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useModelManager from '../../hooks/useModelManager';

const ModelManager = () => {
    const {
        modelName,
        setModelName,
        apiEndpoints,
        apiKey,
        setApiKey,
        description,
        setDescription,
        baseModel,
        setbaseModel,
        baseModels,
        endpointTypes,
        handleAddEndpoint,
        handleEndpointChange,
        handleSave,
        error
    } = useModelManager();

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Model Manager</Typography>
            {error && <Typography color="error">{String(error)}</Typography>}
            <TextField
                label="Model Name"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                fullWidth
                margin="normal"
            />
             <FormControl fullWidth margin="normal">
                <InputLabel>Model Type</InputLabel>
                <Select
                    value={baseModel}
                    onChange={(e) => setbaseModel(e.target.value)}
                >
                    {baseModels.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {apiEndpoints.map((endpoint, index) => (
                <Box key={index} sx={{ mt: 2 }}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>API Endpoint Type (Modality)</InputLabel>
                        <Select
                            value={endpoint.endpointType}
                            onChange={(e) => handleEndpointChange(index, 'endpointType', e.target.value)}
                        >
                            {endpointTypes.map((type) => (
                                <MenuItem key={type.type} value={type.type}>
                                    {type.type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="API Endpoint URL"
                        value={endpoint.endpointURL}
                        onChange={(e) => handleEndpointChange(index, 'endpointURL', e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </Box>
            ))}
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddEndpoint}
                sx={{ mt: 2 }}
            >
                Add API Endpoint
            </Button>
            <TextField
                label="API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                fullWidth
                margin="normal"
                type="password"
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
            />           
            <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
                Save Model
            </Button>
        </Box>
    );
};

export default ModelManager;
