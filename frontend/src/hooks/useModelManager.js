import { useCallback } from 'react';

const useModelManager = () => {
    const fetchModels = useCallback(async () => {
        try {
            const response = await fetch('/api/models');
            if (!response.ok) {
                throw new Error('Failed to fetch models');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching models:', error);
            return [];
        }
    }, []);

    return {
        fetchModels
    };
};

export default useModelManager;