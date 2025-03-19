import { useState } from 'react';
import { useApi } from '../api'; // Assuming you have a custom hook for API calls

const useProblemSubmit = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const api = useApi(); // Custom hook to handle API requests

    const submitProblem = async (problemId, code) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await api.post(`/api/problems/${problemId}/submit`, { code });
            setResult(response.data);
        } catch (err) {
            setError(err.response ? err.response.data : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return {
        submitProblem,
        loading,
        error,
        result,
    };
};

export default useProblemSubmit;