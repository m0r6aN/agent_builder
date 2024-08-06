// useFetchData.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                setError(error);
                console.error(`Failed to fetch data from ${url}:`, error);
            }
        };

        fetchData();
    }, [url]);

    return { data, error };
};

export default useFetchData;