import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loginUser, registerUser, logoutUser, getUserProfile } from '../api/auth';

const useAuth = () => {
    const { setUser, setIsAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const userData = await loginUser(email, password);
            setUser(userData);
            setIsAuthenticated(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const userData = await registerUser(email, password);
            setUser(userData);
            setIsAuthenticated(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError(null);
        try {
            await logoutUser();
            setUser(null);
            setIsAuthenticated(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const profileData = await getUserProfile();
            setUser(profileData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return {
        login,
        register,
        logout,
        loading,
        error,
    };
};

export default useAuth;