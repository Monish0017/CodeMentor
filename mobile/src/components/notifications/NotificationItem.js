import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NotificationItem = ({ notification }) => {
    return (
        <View style={styles.container}>
            <MaterialIcons name="notifications" size={24} color="black" />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{notification.title}</Text>
                <Text style={styles.message}>{notification.message}</Text>
                <Text style={styles.date}>{notification.date}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    textContainer: {
        marginLeft: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    message: {
        fontSize: 14,
        color: '#555',
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
});

export default NotificationItem;