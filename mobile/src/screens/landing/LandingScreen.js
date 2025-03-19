import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LandingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>CodeMentor</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Ace Your Coding Interviews</Text>
          <Text style={styles.heroSubtitle}>
            Practice with real interview questions and get better at technical interviews
          </Text>
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.featureSection}>
          <Text style={styles.sectionTitle}>Why CodeMentor?</Text>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>💻</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Coding Problems</Text>
              <Text style={styles.featureDescription}>
                Practice with hundreds of coding problems, sorted by difficulty and topic
              </Text>
            </View>
          </View>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>🤖</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>AI-Powered Interviews</Text>
              <Text style={styles.featureDescription}>
                Practice with our AI interviewer that adapts to your skill level
              </Text>
            </View>
          </View>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>📊</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Performance Tracking</Text>
              <Text style={styles.featureDescription}>
                Track your progress and identify areas for improvement
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  loginButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  loginButtonText: {
    color: '#6200EE',
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  scrollContent: {
    padding: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginVertical: 40,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333333',
  },
  heroSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666666',
    lineHeight: 26,
  },
  getStartedButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  getStartedButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  featureSection: {
    marginVertical: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333333',
    textAlign: 'center',
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureIconText: {
    fontSize: 24,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

export default LandingScreen;