import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/landing/LandingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import DrawerNavigator from './DrawerNavigator';
import { useAuth } from '../context/AuthContext';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const { userToken } = useAuth();

  return (
    // Remove the NavigationContainer wrapper
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken ? (
        // User is logged in
        <Stack.Screen name="Main" component={DrawerNavigator} />
      ) : (
        // User is not logged in
        <>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;