// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AdminDashboard = () => {
    const [reports, setReports] = useState([]);
    const [quizResults, setQuizResults] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchReports = async () => {
            const storedReports = await AsyncStorage.getItem('reports');
            if (storedReports) {
                setReports(JSON.parse(storedReports));
            }
        };

        const fetchQuizResults = async () => {
            const storedResults = await AsyncStorage.getItem('quizResults');
            if (storedResults) {
                setQuizResults(JSON.parse(storedResults));
            }
        };

        fetchReports();
        fetchQuizResults();
    }, []);

    const handleAddQuestion = () => {
        navigation.navigate('AddQuestion');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Admin Dashboard</Text>

            <TouchableOpacity style={styles.addButton} onPress={handleAddQuestion}>
                <Text style={styles.buttonText}>Add Question</Text>
            </TouchableOpacity>

            <Text style={styles.subHeading}>Reports</Text>
            {reports.length > 0 ? (
                reports.map((report, index) => (
                    <View key={index} style={styles.reportContainer}>
                        <Text style={styles.reportText}>Report: {report}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.noReportsText}>No reports available</Text>
            )}

            <Text style={styles.subHeading}>Quiz Results</Text>
            {quizResults.length > 0 ? (
                quizResults.map((result, index) => (
                    <View key={index} style={styles.resultContainer}>
                        <Text style={styles.resultText}>Student: {result.studentName}</Text>
                        <Text style={styles.resultText}>Score: {result.score}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.noResultsText}>No quiz results available</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    heading: {
        fontSize: 28,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    subHeading: {
        fontSize: 22,
        marginVertical: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    reportContainer: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '100%',
    },
    reportText: {
        fontSize: 18,
        color: '#333',
    },
    noReportsText: {
        fontSize: 18,
        color: '#999',
        textAlign: 'center',
    },
    resultContainer: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '100%',
    },
    resultText: {
        fontSize: 18,
        color: '#333',
    },
    noResultsText: {
        fontSize: 18,
        color: '#999',
        textAlign: 'center',
    },
});

export default AdminDashboard;