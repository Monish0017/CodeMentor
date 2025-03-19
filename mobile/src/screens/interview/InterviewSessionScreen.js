import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import InterviewChat from '../../components/interview/InterviewChat';
import VoiceRecorder from '../../components/interview/VoiceRecorder';
import FeedbackCard from '../../components/interview/FeedbackCard';
import { startInterview, submitInterviewAnswers, getInterviewFeedback } from '../../api/interviews';

const InterviewSessionScreen = () => {
    const route = useRoute();
    const { interviewId } = route.params;
    const [chatMessages, setChatMessages] = useState([]);
    const [recording, setRecording] = useState(false);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        const initiateInterview = async () => {
            const response = await startInterview(interviewId);
            setChatMessages(response.chatMessages);
        };

        initiateInterview();
    }, [interviewId]);

    const handleRecordingStart = () => {
        setRecording(true);
    };

    const handleRecordingStop = async (audioFile) => {
        setRecording(false);
        const response = await submitInterviewAnswers(interviewId, audioFile);
        setFeedback(response.feedback);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>Mock Interview Session</Text>
                <InterviewChat messages={chatMessages} />
                <VoiceRecorder 
                    recording={recording} 
                    onStart={handleRecordingStart} 
                    onStop={handleRecordingStop} 
                />
                {feedback && <FeedbackCard feedback={feedback} />}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default InterviewSessionScreen;