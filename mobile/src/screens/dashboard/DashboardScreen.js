import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const DashboardScreen = ({ navigation }) => {
  const { userData } = useAuth();
  
  // Sample stats data
  const stats = {
    problemsSolved: userData?.problemsSolved || 25,
    interviewsCompleted: userData?.interviewsCompleted || 8,
    streak: 7,
    rank: 42
  };
  
  // Sample recent activities
  const recentActivities = [
    { id: '1', type: 'problem', title: 'Two Sum', difficulty: 'Easy', timestamp: '2 hours ago' },
    { id: '2', type: 'interview', title: 'Frontend Interview', score: '85%', timestamp: 'Yesterday' },
    { id: '3', type: 'problem', title: 'Valid Parentheses', difficulty: 'Medium', timestamp: '3 days ago' },
    { id: '4', type: 'interview', title: 'Data Structures Interview', score: '92%', timestamp: 'Last week' },
  ];

  return (
    <View style={styles.container}>
      {/* Header Section - styled like leaderboard */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.welcomeText}>Welcome back, {userData?.name || 'User'}!</Text>
      </View>
      
      {/* Content Section - with negative margin to overlap header */}
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statsCard}>
              <Text style={styles.statsValue}>{stats.problemsSolved}</Text>
              <Text style={styles.statsLabel}>Problems Solved</Text>
            </View>
            <View style={styles.statsCard}>
              <Text style={styles.statsValue}>{stats.interviewsCompleted}</Text>
              <Text style={styles.statsLabel}>Interviews</Text>
            </View>
            <View style={styles.statsCard}>
              <Text style={styles.statsValue}>{stats.streak}</Text>
              <Text style={styles.statsLabel}>Day Streak</Text>
            </View>
            <View style={styles.statsCard}>
              <Text style={styles.statsValue}>#{stats.rank}</Text>
              <Text style={styles.statsLabel}>Ranking</Text>
            </View>
          </View>
          
          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionContainer}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Coding Problems')}
            >
              <Text style={styles.actionIcon}>📝</Text>
              <Text style={styles.actionText}>Solve Problem</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('AI Interview')}
            >
              <Text style={styles.actionIcon}>🤖</Text>
              <Text style={styles.actionText}>Start Interview</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Leaderboard')}
            >
              <Text style={styles.actionIcon}>🏆</Text>
              <Text style={styles.actionText}>Leaderboard</Text>
            </TouchableOpacity>
          </View>
          
          {/* Recent Activity */}
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivities.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={styles.activityIconContainer}>
                <Text style={styles.activityIcon}>
                  {activity.type === 'problem' ? '📝' : '🤖'}
                </Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                {activity.type === 'problem' ? (
                  <Text style={styles.activityMeta}>Difficulty: {activity.difficulty}</Text>
                ) : (
                  <Text style={styles.activityMeta}>Score: {activity.score}</Text>
                )}
                <Text style={styles.activityTime}>{activity.timestamp}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#6200EE',
    padding: 20,
    paddingBottom: 30,
    zIndex: 2, // Ensure the header appears above the list
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  contentContainer: {
    flex: 1,
    marginTop: -15, // Create overlap with header like in leaderboard
    zIndex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 20, // Extra padding to ensure first item is fully visible
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 8,
  },
  statsLabel: {
    fontSize: 14,
    color: '#666666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
    marginTop: 8,
  },
  quickActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    width: '31%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityIcon: {
    fontSize: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  activityMeta: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#999999',
  },
});

export default DashboardScreen;