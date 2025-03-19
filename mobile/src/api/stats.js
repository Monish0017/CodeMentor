import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com/api'; // Replace with your actual API base URL

// Function to get user performance metrics
export const getUserStats = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/stats`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in local storage
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user stats:', error);
        throw error;
    }
};

// Function to get leaderboard rankings
export const getLeaderboard = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/stats/leaderboard`);
        return response.data;
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        throw error;
    }
};

// Function to get personalized study recommendations
export const getRecommendations = async (userId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/stats/recommendations`, { userId });
        return response.data;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
    }
};