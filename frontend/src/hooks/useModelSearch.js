import { useCallback } from 'react';

const useModelSearch = () => {
    const searchModels = useCallback(async (type) => {
        try {
            const response = await fetch('/api/search-models', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: type })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const results = await response.json();
            console.log('Search results:', results);
            return results;
        } catch (error) {
            console.error('Error searching models:', error);
            // Handle error (e.g., show a notification to the user)
            return [];
        }
    }, []);

    return {
        searchModels
    };
};

export default useModelSearch;
