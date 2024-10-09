// Welcome.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Welcome = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome to the React Native Quiz</Text>
            <TouchableOpacity
                style={styles.startButton}
                onPress={() => navigation.navigate('Quiz')}
            >
                <Text style={styles.buttonText}>Start Quiz</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    heading: {
        fontSize: 28,
        marginBottom: 40,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    startButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Welcome;