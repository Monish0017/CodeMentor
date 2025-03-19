import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com/api'; // Replace with your actual API base URL

// Start a mock interview
export const startInterview = async (userId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/interview/start`, { userId });
        return response.data;
    } catch (error) {
        throw new Error('Error starting interview: ' + error.message);
    }
};

// Submit answers during an interview
export const submitInterviewAnswers = async (interviewId, answers) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/interview/${interviewId}/submit`, { answers });
        return response.data;
    } catch (error) {
        throw new Error('Error submitting interview answers: ' + error.message);
    }
};

// Get interview session details
export const getInterviewDetails = async (interviewId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/interview/${interviewId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching interview details: ' + error.message);
    }
};

// Get feedback after an interview
export const getInterviewFeedback = async (interviewId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/interview/${interviewId}/feedback`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching interview feedback: ' + error.message);
    }
};