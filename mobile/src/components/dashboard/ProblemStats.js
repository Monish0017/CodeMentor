import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getUserStats } from '../../api/stats'; // Assuming this function fetches user stats

const ProblemStats = () => {
    const [stats, setStats] = useState({
        problemsSolved: 0,
        interviewsAttended: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getUserStats();
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching user stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Problem Statistics</Text>
            <View style={styles.statContainer}>
                <Text style={styles.statLabel}>Problems Solved:</Text>
                <Text style={styles.statValue}>{stats.problemsSolved}</Text>
            </View>
            <View style={styles.statContainer}>
                <Text style={styles.statLabel}>Interviews Attended:</Text>
                <Text style={styles.statValue}>{stats.interviewsAttended}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    statContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    statLabel: {
        fontSize: 16,
        color: '#555',
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProblemStats;