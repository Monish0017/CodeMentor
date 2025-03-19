import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import DrawerNavigator from './src/navigation/DrawerNavigator';

// Create the drawer navigator
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <Drawer.Navigator 
              initialRouteName="Home"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#6200EE',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <Drawer.Screen 
                name="Home" 
                component={AppNavigator} 
                options={{ 
                  title: 'CodeMentor',
                  headerShown: true
                }}
              />
              <Drawer.Screen name="Auth" component={AuthNavigator} />
              <Drawer.Screen name="Dashboard" component={DrawerNavigator} />
            </Drawer.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}