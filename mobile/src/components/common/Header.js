import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

const Header = ({ title }) => {
    return (
        <Appbar.Header style={styles.header}>
            <Appbar.Content title={title} />
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#6200ee',
    },
});

export default Header;