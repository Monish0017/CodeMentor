import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card as PaperCard } from 'react-native-paper';

const Card = ({ title, content, footer }) => {
    return (
        <PaperCard style={styles.card}>
            <PaperCard.Content>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{content}</Text>
            </PaperCard.Content>
            {footer && <PaperCard.Actions>{footer}</PaperCard.Actions>}
        </PaperCard>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderRadius: 8,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        fontSize: 14,
        marginVertical: 10,
    },
});

export default Card;