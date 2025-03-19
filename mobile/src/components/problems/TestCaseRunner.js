import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CodeEditor from '../common/CodeEditor';
import { runTestCases } from '../../api/problems';

const TestCaseRunner = ({ problemId, onTestResult }) => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleRunTests = async () => {
        setLoading(true);
        setResult(null);
        try {
            const response = await runTestCases(problemId, code);
            setResult(response);
            onTestResult(response); // Callback to parent component
        } catch (error) {
            setResult({ error: 'Error running test cases' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Test Case Runner</Text>
            <CodeEditor
                value={code}
                onChange={setCode}
                placeholder="Write your code here..."
            />
            <Button
                title={loading ? 'Running...' : 'Run Tests'}
                onPress={handleRunTests}
                disabled={loading}
            />
            {result && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>Test Results:</Text>
                    {result.error ? (
                        <Text style={styles.errorText}>{result.error}</Text>
                    ) : (
                        result.testCases.map((testCase, index) => (
                            <Text key={index} style={styles.testCaseText}>
                                {`Test Case ${index + 1}: ${testCase.passed ? 'Passed' : 'Failed'}`}
                            </Text>
                        ))
                    )}
                </View>
            )}
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
    resultContainer: {
        marginTop: 16,
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
    },
    testCaseText: {
        fontSize: 16,
    },
});

export default TestCaseRunner;