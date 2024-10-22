// AddQuestion.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Button } from 'react-native';
import { quizData } from './quizData';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const AddQuestion = ({ navigation }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [adminEmail, setAdminEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const getEmail = async () => {
            const email = await AsyncStorage.getItem('adminEmail');
            if (email) {
                setAdminEmail(email);
                setModalVisible(false);
            }
        };
        getEmail();
    }, []);

    const handleAddQuestion = () => {
        if (question && options.every(opt => opt) && correctAnswer) {
            quizData.push({
                question,
                options,
                correctAnswer,
            });
            alert('Question added successfully!');
            setQuestion('');
            setOptions(['', '', '', '']);
            setCorrectAnswer('');
        } else {
            alert('Please fill all fields');
        }
    };

    const handleDeleteQuestion = (index) => {
        quizData.splice(index, 1);
        alert('Question deleted successfully!');
        setQuestion('');
    };

    const handleEmailSubmit = async () => {
        if (adminEmail.trim() === '') {
            setErrorMessage('Email cannot be empty');
            return;
        }
        await AsyncStorage.setItem('adminEmail', adminEmail);
        setModalVisible(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Enter your email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={adminEmail}
                        onChangeText={setAdminEmail}
                    />
                    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                    <Button title="Submit" onPress={handleEmailSubmit} />
                </View>
            </Modal>

            <Text style={styles.heading}>Add Question</Text>
            <TextInput
                style={styles.input}
                placeholder="Question"
                value={question}
                onChangeText={setQuestion}
            />
            {options.map((option, index) => (
                <TextInput
                    key={index}
                    style={styles.input}
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChangeText={text => {
                        const newOptions = [...options];
                        newOptions[index] = text;
                        setOptions(newOptions);
                    }}
                />
            ))}
            <TextInput
                style={styles.input}
                placeholder="Correct Answer"
                value={correctAnswer}
                onChangeText={setCorrectAnswer}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddQuestion}>
                <Text style={styles.buttonText}>Add Question</Text>
            </TouchableOpacity>

            <Text style={styles.heading}>Existing Questions</Text>
            {quizData.map((q, index) => (
                <View key={index} style={styles.questionContainer}>
                    <View style={styles.questionHeader}>
                        <Text style={styles.questionText}>{q.question}</Text>
                        <TouchableOpacity onPress={() => handleDeleteQuestion(index)}>
                            <Ionicons name="trash" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                    {q.options.map((option, idx) => (
                        <Text key={idx} style={styles.optionText}>{option}</Text>
                    ))}
                    <Text style={styles.correctAnswerText}>Correct Answer: {q.correctAnswer}</Text>
                </View>
            ))}
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
    input: {
        width: '80%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
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
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    questionContainer: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '100%',
    },
    questionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    correctAnswerText: {
        fontSize: 16,
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default AddQuestion;