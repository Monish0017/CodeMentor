import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import colors from '../../theme/colors';

const ProfileCard = () => {
    const { user } = useContext(AuthContext);

    return (
        <View style={styles.card}>
            <Image
                source={user.profilePicture ? { uri: user.profilePicture } : require('../../../assets/images/avatar-placeholder.png')}
                style={styles.avatar}
            />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.stats}>Problems Solved: {user.problemsSolved}</Text>
            <Text style={styles.stats}>Interviews Attended: {user.interviewsAttended}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
    },
    email: {
        fontSize: 14,
        color: colors.gray,
        marginBottom: 5,
    },
    stats: {
        fontSize: 12,
        color: colors.darkGray,
    },
});

export default ProfileCard;