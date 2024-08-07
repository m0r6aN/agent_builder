import React from 'react';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, IconButton, CircularProgress, Alert, AlertTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useTaskManager from '../../hooks/useTaskManager';

const TaskManager = () => {
    const baseURL = process.env.DB_API_URL;
    const {
        taskName,
        setTaskName,
        tasks,
        error,
        isLoading,
        handleAddTask,
        deleteTask
    } = useTaskManager(baseURL);

    if (isLoading) return <CircularProgress />;
    if (error) return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error.message}
        </Alert>
    );

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Task Manager</Typography>
            <TextField
                label="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button 
                variant="contained" 
                onClick={handleAddTask} 
                sx={{ mt: 2 }}
            >
                Add Task
            </Button>
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Tasks:</Typography>
                <List>
                    {tasks.map((task) => (
                        <ListItem key={task._id} secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task._id)}>
                                <DeleteIcon />
                            </IconButton>
                        }>
                            <ListItemText primary={task.name} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default TaskManager;