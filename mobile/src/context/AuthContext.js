import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const user = await AsyncStorage.getItem('userData');
        
        if (token) {
          setUserToken(token);
          setUserData(user ? JSON.parse(user) : null);
        }
      } catch (e) {
        console.error('Failed to load auth state:', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  const signIn = async (email, password) => {
    try {
      // Accept any credentials
      const token = 'dummy-auth-token';
      const user = {
        id: '1',
        email,
        name: 'User',
        problemsSolved: 0,
        interviewsCompleted: 0,
        score: 0
      };
      
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      
      setUserToken(token);
      setUserData(user);
      
      return { success: true };
    } catch (e) {
      console.error('Failed to sign in:', e);
      return { success: false, error: 'Authentication failed' };
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      setUserToken(null);
      setUserData(null);
    } catch (e) {
      console.error('Failed to sign out:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoading, userToken, userData, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};