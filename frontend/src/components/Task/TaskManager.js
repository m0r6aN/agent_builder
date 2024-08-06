// TaskManager.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useFetchData from '../../hooks/useFetchData';
import useCrudOperations from '../../hooks/useCrudOperations';

const TaskManager = () => {
    const baseURL = process.env.DB_API_BASE_URL;
    const [taskName, setTaskName] = useState('');
    const { data: tasks, error } = useFetchData(`${baseURL}/tasks`);
    const { addItem: addTask, deleteItem: deleteTask } = useCrudOperations(`${baseURL}/tasks`);

    const handleAddTask = () => {
        if (taskName.trim() === '') return;
        addTask({ name: taskName });
        setTaskName('');
    };

    if (error) return <p>Error fetching tasks: {error.message}</p>;

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