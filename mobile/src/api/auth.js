import axios from 'axios';

const API_URL = 'https://your-api-url.com/api/auth'; // Replace with your actual API URL

// Register a new user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Login user with email and password
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Google OAuth login
export const googleLogin = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/google`, { idToken: token });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Logout user
export const logoutUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/logout`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Get user profile
export const getUserProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Update user profile
export const updateUserProfile = async (profileData) => {
    try {
        const response = await axios.put(`${API_URL}/profile`, profileData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Delete user account
export const deleteUserAccount = async () => {
    try {
        const response = await axios.delete(`${API_URL}/delete`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};