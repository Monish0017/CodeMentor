import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useInterview } from '../../hooks/useInterview'; // Custom hook for interview logic

const InterviewChat = ({ interviewId }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { fetchInterviewMessages, sendMessage } = useInterview(interviewId);

    useEffect(() => {
        const loadMessages = async () => {
            const initialMessages = await fetchInterviewMessages();
            setMessages(initialMessages);
        };

        loadMessages();
    }, [fetchInterviewMessages]);

    const handleSend = async () => {
        if (message.trim()) {
            const newMessage = await sendMessage(message);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage('');
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
                inverted
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type your message..."
                />
                <Button title="Send" onPress={handleSend} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f1f1f1',
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
});

export default InterviewChat;