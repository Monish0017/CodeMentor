import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const InterviewListScreen = ({ navigation }) => {
  // Sample data for available interview types
  const interviewTypes = [
    { id: '1', title: 'Frontend Interview', description: 'Practice frontend development questions & concepts', difficulty: 'Medium', duration: '45 mins' },
    { id: '2', title: 'Backend Interview', description: 'Practice backend development questions & system design', difficulty: 'Hard', duration: '60 mins' },
    { id: '3', title: 'Full Stack Interview', description: 'Comprehensive interview covering both front and backend', difficulty: 'Hard', duration: '90 mins' },
    { id: '4', title: 'Data Structures & Algorithms', description: 'Focus on DSA problem-solving and optimization', difficulty: 'Medium', duration: '60 mins' },
    { id: '5', title: 'System Design', description: 'Focus on designing scalable systems and architecture', difficulty: 'Hard', duration: '45 mins' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={[
          styles.difficultyBadge, 
          item.difficulty === 'Easy' ? styles.easyBadge : 
          item.difficulty === 'Medium' ? styles.mediumBadge : 
          styles.hardBadge
        ]}>
          <Text style={styles.difficultyText}>{item.difficulty}</Text>
        </View>
      </View>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardMetadata}>Duration: {item.duration}</Text>
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Start Interview</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Practice Interviews</Text>
        <Text style={styles.headerSubtitle}>Choose an interview type to practice</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <FlatList
          data={interviewTypes}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  contentContainer: {
    flex: 1,
    marginTop: -5, // Create slight overlap
    zIndex: 1,
  },
  listContainer: {
    padding: 16,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  easyBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  mediumBadge: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
  },
  hardBadge: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardMetadata: {
    fontSize: 14,
    color: '#888888',
  },
  startButton: {
    backgroundColor: '#6200EE',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default InterviewListScreen;