import { useState } from "react";

const useFetch = (requestConfig, applyData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchTasks = async (taskText) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                requestConfig.url,
                { 
                    method: requestConfig.method ? requestConfig.method : 'GET',
                    headers: requestConfig.headers ? requestConfig.headers : {},
                    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
                }
            );
            
            if (!response.ok) {
            throw new Error('Request failed!');
            }
    
            const data = await response.json();
            applyData(data);
            
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }
    return {
        isLoading,
        error,
        fetchTasks
    }
}

export default useFetch;