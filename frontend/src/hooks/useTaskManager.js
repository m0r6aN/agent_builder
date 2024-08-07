import { useState } from 'react';
import useFetchData from './useFetchData';
import useCrudOperations from './useCrudOperations';

const useTaskManager = (baseURL) => {
    const [taskName, setTaskName] = useState('');
    const { data: tasks, error, isLoading } = useFetchData(`${baseURL}/tasks`);
    const { addItem: addTask, deleteItem: deleteTask } = useCrudOperations(`${baseURL}/tasks`);

    const handleAddTask = () => {
        if (taskName.trim() === '') return;
        addTask({ name: taskName });
        setTaskName('');
    };

    return {
        taskName,
        setTaskName,
        tasks,
        error,
        isLoading,
        handleAddTask,
        deleteTask
    };
};

export default useTaskManager;