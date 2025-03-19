import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import ProfileAvatar from '../../components/common/ProfileAvatar';

const NotificationScreen = () => {
  const [jobNotifications, setJobNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would be replaced with actual LinkedIn API integration
    fetchJobNotifications();
  }, []);

  // Mock function to fetch job notifications - would be replaced with actual API call
  const fetchJobNotifications = () => {
    // Simulating API response delay
    setTimeout(() => {
      const mockJobData = [
        {
          id: '1',
          company: 'Google',
          position: 'Frontend Developer',
          location: 'Mountain View, CA',
          posted: '2 hours ago',
          salary: '$120K - $150K',
          read: false,
          url: 'https://careers.google.com',
        },
        {
          id: '2',
          company: 'Microsoft',
          position: 'Full Stack Engineer',
          location: 'Redmond, WA',
          posted: '1 day ago',
          salary: '$110K - $140K',
          read: false,
          url: 'https://careers.microsoft.com',
        },
        {
          id: '3',
          company: 'Amazon',
          position: 'Software Development Engineer',
          location: 'Seattle, WA',
          posted: '2 days ago',
          salary: '$115K - $155K',
          read: true,
          url: 'https://amazon.jobs',
        },
        {
          id: '4',
          company: 'Facebook',
          position: 'React Native Developer',
          location: 'Menlo Park, CA',
          posted: '3 days ago',
          salary: '$125K - $160K',
          read: true,
          url: 'https://facebook.com/careers',
        },
        {
          id: '5',
          company: 'Netflix',
          position: 'Senior Frontend Engineer',
          location: 'Los Gatos, CA',
          posted: '4 days ago',
          salary: '$140K - $180K',
          read: false,
          url: 'https://jobs.netflix.com',
        },
      ];
      
      setJobNotifications(mockJobData);
      setLoading(false);
    }, 1000);
  };

  const markAsRead = (id) => {
    setJobNotifications(prev => 
      prev.map(job => job.id === id ? {...job, read: true} : job)
    );
  };

  const openJobListing = (job) => {
    // Mark as read
    markAsRead(job.id);
    
    // Open URL - in a real app, this would navigate to a job details screen
    // or open the link in an in-app browser
    Linking.openURL(job.url).catch(err => 
      console.error('Failed to open URL:', err)
    );
  };

  const renderJobItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.jobItem,
        !item.read && styles.unreadJob
      ]}
      onPress={() => openJobListing(item)}
    >
      <View style={styles.companyLogoContainer}>
        <ProfileAvatar name={item.company} size={46} />
      </View>
      
      <View style={styles.jobContent}>
        <Text style={styles.companyName}>{item.company}</Text>
        <Text style={styles.positionTitle}>{item.position}</Text>
        <View style={styles.jobMetaContainer}>
          <Text style={styles.jobLocation}>📍 {item.location}</Text>
          <Text style={styles.jobSalary}>💰 {item.salary}</Text>
        </View>
        <Text style={styles.postedTime}>Posted: {item.posted}</Text>
      </View>
      
      {!item.read && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header styled to match leaderboard/dashboard */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Job Notifications</Text>
        <Text style={styles.headerSubtitle}>
          Latest opportunities tailored for you
        </Text>
      </View>
      
      {/* Job listings with negative margin to create overlap */}
      <View style={styles.contentContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading job notifications...</Text>
          </View>
        ) : jobNotifications.length > 0 ? (
          <FlatList
            data={jobNotifications}
            renderItem={renderJobItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.jobsList}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No job notifications yet</Text>
          </View>
        )}
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
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  contentContainer: {
    flex: 1,
    marginTop: -15,
    zIndex: 1,
  },
  jobsList: {
    padding: 16,
    paddingTop: 20,
  },
  jobItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  unreadJob: {
    borderLeftWidth: 4,
    borderLeftColor: '#6200EE',
  },
  companyLogoContainer: {
    marginRight: 16,
  },
  jobContent: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  positionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6200EE',
    marginBottom: 8,
  },
  jobMetaContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  jobLocation: {
    fontSize: 14,
    color: '#666666',
    marginRight: 12,
  },
  jobSalary: {
    fontSize: 14,
    color: '#666666',
  },
  postedTime: {
    fontSize: 12,
    color: '#999999',
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6200EE',
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
  },
});

export default NotificationScreen;