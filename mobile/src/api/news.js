import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com/api'; // Replace with your actual API base URL

// Fetch latest tech news
export const fetchTechNews = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/news`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tech news:', error);
        throw error;
    }
};

// Fetch job postings
export const fetchJobPostings = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/news/jobs`);
        return response.data;
    } catch (error) {
        console.error('Error fetching job postings:', error);
        throw error;
    }
};

// Fetch promotions and coding challenges
export const fetchPromotions = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/news/promotions`);
        return response.data;
    } catch (error) {
        console.error('Error fetching promotions:', error);
        throw error;
    }
};