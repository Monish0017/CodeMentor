import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getProblemById } from '../../api/problems';
import CodeEditor from '../../components/common/CodeEditor';
import TestCaseRunner from '../../components/problems/TestCaseRunner';
import CodeSubmission from '../../components/problems/CodeSubmission';

const ProblemDetailScreen = () => {
    const route = useRoute();
    const { problemId } = route.params;
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const data = await getProblemById(problemId);
                setProblem(data);
            } catch (error) {
                console.error('Error fetching problem:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProblem();
    }, [problemId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!problem) {
        return (
            <View style={styles.errorContainer}>
                <Text>Error loading problem details.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{problem.title}</Text>
            <Text style={styles.description}>{problem.description}</Text>
            <Text style={styles.subTitle}>Example Input:</Text>
            <Text style={styles.example}>{problem.exampleInput}</Text>
            <Text style={styles.subTitle}>Example Output:</Text>
            <Text style={styles.example}>{problem.exampleOutput}</Text>
            <CodeEditor problemId={problemId} />
            <TestCaseRunner problemId={problemId} />
            <CodeSubmission problemId={problemId} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 16,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 16,
    },
    example: {
        fontSize: 16,
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 4,
        marginBottom: 16,
    },
});

export default ProblemDetailScreen;