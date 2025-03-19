import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getJobAlerts } from '../../api/news'; // Assuming this function fetches job alerts
import NotificationItem from './NotificationItem';

const JobAlert = () => {
    const [jobAlerts, setJobAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobAlerts = async () => {
            try {
                const alerts = await getJobAlerts();
                setJobAlerts(alerts);
            } catch (error) {
                console.error("Error fetching job alerts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobAlerts();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading job alerts...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Job Alerts</Text>
            <FlatList
                data={jobAlerts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <NotificationItem notification={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default JobAlert;