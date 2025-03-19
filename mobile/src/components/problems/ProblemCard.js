import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProblemCard = ({ problem }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('ProblemDetailScreen', { problemId: problem.id });
    };

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress}>
            <View style={styles.content}>
                <Text style={styles.title}>{problem.title}</Text>
                <Text style={styles.description}>{problem.description}</Text>
                <Text style={styles.difficulty}>Difficulty: {problem.difficulty}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        marginVertical: 10,
        padding: 15,
    },
    content: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginVertical: 5,
    },
    difficulty: {
        fontSize: 12,
        color: '#999',
    },
});

export default ProblemCard;