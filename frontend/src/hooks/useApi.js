// hooks/useApi.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useApi = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (err) {
            setError(err);
        }
    }, [url]); // Include url in dependency array if it changes

    useEffect(() => {
        fetchData();
    }, [fetchData]); // Include fetchData in the dependency array

    return { data, error };
};

export default useApi;
