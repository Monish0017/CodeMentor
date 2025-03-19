import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileAvatar from '../../components/common/ProfileAvatar';

const LeaderboardScreen = () => {
  const [timeFrame, setTimeFrame] = useState('weekly'); // 'weekly', 'monthly', 'allTime'
  
  // Sample data for the leaderboard
  const leaderboardData = [
    { id: '1', name: 'John Doe', score: 850, problems: 42, rank: 1 },
    { id: '2', name: 'Jane Smith', score: 780, problems: 39, rank: 2 },
    { id: '3', name: 'Alex Johnson', score: 750, problems: 37, rank: 3 },
    { id: '4', name: 'Sarah Williams', score: 720, problems: 36, rank: 4 },
    { id: '5', name: 'Michael Brown', score: 690, problems: 34, rank: 5 },
    { id: '6', name: 'Emily Davis', score: 650, problems: 32, rank: 6 },
    { id: '7', name: 'Robert Wilson', score: 620, problems: 31, rank: 7 },
    { id: '8', name: 'Lisa Moore', score: 600, problems: 30, rank: 8 },
    { id: '9', name: 'David Taylor', score: 580, problems: 29, rank: 9 },
    { id: '10', name: 'Jennifer Anderson', score: 550, problems: 27, rank: 10 },
  ];
  
  // Function to render a leaderboard item
  const renderItem = ({ item, index }) => (
    <View style={[styles.leaderboardItem, index < 3 ? styles.topThree : null]}>
      <Text style={styles.rankText}>{item.rank}</Text>
      <ProfileAvatar name={item.name} size={40} style={styles.avatar} />
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.problemsText}>{item.problems} problems solved</Text>
      </View>
      <Text style={styles.scoreText}>{item.score}</Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <View style={styles.timeFilter}>
          <TouchableOpacity 
            style={[styles.filterButton, timeFrame === 'weekly' ? styles.activeFilter : null]} 
            onPress={() => setTimeFrame('weekly')}
          >
            <Text style={[styles.filterText, timeFrame === 'weekly' ? styles.activeFilterText : null]}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, timeFrame === 'monthly' ? styles.activeFilter : null]} 
            onPress={() => setTimeFrame('monthly')}
          >
            <Text style={[styles.filterText, timeFrame === 'monthly' ? styles.activeFilterText : null]}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, timeFrame === 'allTime' ? styles.activeFilter : null]} 
            onPress={() => setTimeFrame('allTime')}
          >
            <Text style={[styles.filterText, timeFrame === 'allTime' ? styles.activeFilterText : null]}>All Time</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.listContainer}>
        <FlatList
          data={leaderboardData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
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
    paddingBottom: 20,
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  timeFilter: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    padding: 4,
    marginBottom: 10, // Add some bottom margin
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: '#FFFFFF',
  },
  filterText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#6200EE',
  },
  listContainer: {
    flex: 1,
    marginTop: -5, // Reduced negative margin to avoid hiding content
    zIndex: 1,
  },
  listContent: {
    paddingTop: 20, // Increased top padding to ensure first item is visible
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  leaderboardItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topThree: {
    borderLeftWidth: 5,
    borderLeftColor: '#FFC107',
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 25,
    marginRight: 15,
    color: '#666',
  },
  avatar: {
    marginRight: 12,
  },
  nameContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  problemsText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200EE',
  },
});

export default LeaderboardScreen;