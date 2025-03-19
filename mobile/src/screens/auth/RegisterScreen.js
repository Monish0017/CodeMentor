import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const { signIn } = useAuth();

    const handleRegister = async () => {
        try {
            // Basic validation
            if (!name || !email || !password || !confirmPassword) {
                setErrorMsg('All fields are required');
                return;
            }

            if (password !== confirmPassword) {
                setErrorMsg('Passwords do not match');
                return;
            }

            // For this example, we'll just sign in the user
            const result = await signIn(email, password);
            if (!result.success) {
                setErrorMsg(result.error || 'Registration failed');
            }
        } catch (error) {
            setErrorMsg('Registration failed');
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Join CodeMentor and start acing interviews</Text>
            </View>

            {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    autoCapitalize="words"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.googleButton}>
                    <Text style={styles.googleButtonText}>Sign Up with Google</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Log In</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    backButton: {
        marginTop: 10,
        marginBottom: 20,
    },
    backButtonText: {
        fontSize: 16,
        color: '#6200EE',
    },
    header: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#6200EE',
    },
    subtitle: {
        fontSize: 16,
        color: '#666666',
        marginTop: 8,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    form: {
        marginBottom: 30,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
    },
    button: {
        backgroundColor: '#6200EE',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    googleButton: {
        backgroundColor: '#FFFFFF',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CCCCCC',
    },
    googleButtonText: {
        color: '#666666',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 20,
    },
    footerText: {
        color: '#666666',
        marginRight: 5,
    },
    link: {
        color: '#6200EE',
        fontWeight: 'bold',
    },
});

export default RegisterScreen;