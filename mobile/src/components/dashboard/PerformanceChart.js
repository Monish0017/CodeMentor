import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Placeholder component until react-native-chart-kit is installed
const PerformanceChart = ({ data, title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || 'Performance Chart'}</Text>
      <View style={styles.placeholderChart}>
        <Text style={styles.placeholderText}>
          Chart will appear here after installing react-native-chart-kit
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placeholderChart: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 20,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#666',
  }
});

export default PerformanceChart;