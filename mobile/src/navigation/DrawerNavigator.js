import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import ProblemsListScreen from '../screens/problems/ProblemsListScreen';
import InterviewListScreen from '../screens/interview/InterviewListScreen';
import LeaderboardScreen from '../screens/leaderboard/LeaderboardScreen';
import NotificationScreen from '../screens/notifications/NotificationScreen';
import CustomDrawerContent from '../components/navigation/CustomDrawerContent';
import { useAuth } from '../context/AuthContext';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { signOut, userData } = useAuth();
  
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} userData={userData} onSignOut={signOut} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6200EE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Coding Problems" component={ProblemsListScreen} />
      <Drawer.Screen name="AI Interview" component={InterviewListScreen} />
      <Drawer.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Drawer.Screen name="Notifications" component={NotificationScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 15,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default DrawerNavigator;