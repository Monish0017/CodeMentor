import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from '../common/Button';
import CodeEditor from '../common/CodeEditor';
import TestCaseRunner from './TestCaseRunner';
import { submitCode } from '../../api/problems';
import { useProblemSubmit } from '../../hooks/useProblemSubmit';

const CodeSubmission = ({ problemId }) => {
    const [code, setCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionResult, setSubmissionResult] = useState(null);
    const { submitProblem } = useProblemSubmit();

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const result = await submitCode(problemId, code);
        setSubmissionResult(result);
        setIsSubmitting(false);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Submit Your Code</Text>
            <CodeEditor
                value={code}
                onChange={setCode}
                placeholder="Write your code here..."
            />
            <Button
                title={isSubmitting ? 'Submitting...' : 'Submit Code'}
                onPress={handleSubmit}
                disabled={isSubmitting}
            />
            {submissionResult && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>Submission Result:</Text>
                    <Text style={styles.resultText}>{submissionResult.message}</Text>
                </View>
            )}
            <TestCaseRunner problemId={problemId} />
        </ScrollView>
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
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultText: {
        fontSize: 16,
    },
});

export default CodeSubmission;