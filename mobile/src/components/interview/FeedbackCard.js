import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../common/Card';

const FeedbackCard = ({ feedback }) => {
    return (
        <Card style={styles.card}>
            <Text style={styles.title}>Interview Feedback</Text>
            <Text style={styles.feedbackText}>{feedback}</Text>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    feedbackText: {
        fontSize: 16,
        color: '#333',
    },
});

export default FeedbackCard;