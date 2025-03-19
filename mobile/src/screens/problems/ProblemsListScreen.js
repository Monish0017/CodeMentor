import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const ProblemsListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  
  // Sample data for problems
  const problems = [
    { id: '1', title: 'Two Sum', difficulty: 'Easy', tags: ['Array', 'Hash Table'], solved: true, acceptance: '47%' },
    { id: '2', title: 'Add Two Numbers', difficulty: 'Medium', tags: ['Linked List', 'Math'], solved: false, acceptance: '35%' },
    { id: '3', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', tags: ['String', 'Sliding Window'], solved: false, acceptance: '31%' },
    { id: '4', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', tags: ['Array', 'Binary Search'], solved: false, acceptance: '29%' },
    { id: '5', title: 'Longest Palindromic Substring', difficulty: 'Medium', tags: ['String', 'Dynamic Programming'], solved: true, acceptance: '30%' },
    { id: '6', title: 'Reverse Integer', difficulty: 'Medium', tags: ['Math'], solved: false, acceptance: '25%' },
    { id: '7', title: 'String to Integer (atoi)', difficulty: 'Medium', tags: ['String', 'Math'], solved: false, acceptance: '15%' },
    { id: '8', title: 'Palindrome Number', difficulty: 'Easy', tags: ['Math'], solved: true, acceptance: '49%' },
    { id: '9', title: 'Container With Most Water', difficulty: 'Medium', tags: ['Array', 'Two Pointers'], solved: false, acceptance: '51%' },
    { id: '10', title: 'Regular Expression Matching', difficulty: 'Hard', tags: ['String', 'Dynamic Programming'], solved: false, acceptance: '27%' },
  ];
  
  // Filter problems based on search query and difficulty
  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });
  
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.problemItem}>
      <View style={styles.problemHeader}>
        <Text style={styles.problemTitle}>{item.title}</Text>
        <View style={[
          styles.difficultyBadge, 
          item.difficulty === 'Easy' ? styles.easyBadge : 
          item.difficulty === 'Medium' ? styles.mediumBadge : 
          styles.hardBadge
        ]}>
          <Text style={[
            styles.difficultyText,
            item.difficulty === 'Easy' ? styles.easyText : 
            item.difficulty === 'Medium' ? styles.mediumText : 
            styles.hardText
          ]}>{item.difficulty}</Text>
        </View>
      </View>
      
      <View style={styles.tagsContainer}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tagBadge}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.problemFooter}>
        <Text style={styles.acceptanceText}>Acceptance: {item.acceptance}</Text>
        {item.solved ? (
          <View style={styles.solvedBadge}>
            <Text style={styles.solvedText}>Solved</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.solveButton}>
            <Text style={styles.solveButtonText}>Solve</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Coding Problems</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search problems..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, selectedDifficulty === 'All' && styles.selectedFilter]} 
            onPress={() => setSelectedDifficulty('All')}
          >
            <Text style={[styles.filterText, selectedDifficulty === 'All' && styles.selectedFilterText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, selectedDifficulty === 'Easy' && styles.selectedFilter]} 
            onPress={() => setSelectedDifficulty('Easy')}
          >
            <Text style={[styles.filterText, selectedDifficulty === 'Easy' && styles.selectedFilterText]}>Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, selectedDifficulty === 'Medium' && styles.selectedFilter]} 
            onPress={() => setSelectedDifficulty('Medium')}
          >
            <Text style={[styles.filterText, selectedDifficulty === 'Medium' && styles.selectedFilterText]}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, selectedDifficulty === 'Hard' && styles.selectedFilter]} 
            onPress={() => setSelectedDifficulty('Hard')}
          >
            <Text style={[styles.filterText, selectedDifficulty === 'Hard' && styles.selectedFilterText]}>Hard</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={filteredProblems}
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
  contentContainer: {
    flex: 1,
    marginTop: -5, // Create slight overlap
    zIndex: 1,
    paddingTop: 15,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedFilter: {
    backgroundColor: '#6200EE',
  },
  filterText: {
    fontSize: 14,
    color: '#666666',
  },
  selectedFilterText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  problemItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  problemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  problemTitle: {
    fontSize: 16,
    fontWeight: '600',
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
  easyText: {
    color: '#4CAF50',
  },
  mediumText: {
    color: '#FFC107',
  },
  hardText: {
    color: '#F44336',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tagBadge: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#757575',
  },
  problemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  acceptanceText: {
    fontSize: 12,
    color: '#757575',
  },
  solvedBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  solvedText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  solveButton: {
    backgroundColor: '#6200EE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  solveButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ProblemsListScreen;