import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useCodeSubmission } from '../../hooks/useProblemSubmit';

const CodeEditor = ({ problemId }) => {
    const [code, setCode] = useState('');
    const { submitCode, loading } = useCodeSubmission(problemId);

    const handleSubmit = async () => {
        if (code.trim()) {
            await submitCode(code);
            setCode(''); // Clear the code editor after submission
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                multiline
                placeholder="Write your code here..."
                value={code}
                onChangeText={setCode}
                textAlignVertical="top"
            />
            <Button
                title={loading ? 'Submitting...' : 'Submit Code'}
                onPress={handleSubmit}
                disabled={loading}
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
    textInput: {
        height: 300,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
});

export default CodeEditor;