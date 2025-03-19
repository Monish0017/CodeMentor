import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com/api'; // Replace with your actual API base URL

// Fetch all coding problems
export const fetchProblems = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/problems`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching problems: ' + error.message);
    }
};

// Fetch a specific coding problem by ID
export const fetchProblemById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/problems/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching problem: ' + error.message);
    }
};

// Submit code for evaluation
export const submitCode = async (problemId, code) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/problems/${problemId}/submit`, { code });
        return response.data;
    } catch (error) {
        throw new Error('Error submitting code: ' + error.message);
    }
};

// Get solution or hints for a specific problem
export const getProblemSolution = async (problemId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/problems/${problemId}/solution`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching solution: ' + error.message);
    }
};

// Fetch a problem from LeetCode
export const fetchLeetCodeProblem = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/problems/leetcode/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching LeetCode problem: ' + error.message);
    }
};