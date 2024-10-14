import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { quizData } from './quizData';

const Quiz = ({ navigation }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [flashMessage, setFlashMessage] = useState('');
    const [emailSubmitted, setEmailSubmitted] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            handleAnswer(null);
        }
    }, [timeLeft]);

    const handleAnswer = (selectedOption) => {
        if (selectedOption === quizData[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setTimeLeft(30);
        } else {
            setQuizCompleted(true);
        }
    };

    const handleSubmit = () => {
        if (emailSubmitted) {
            setFlashMessage('Email already submitted!');
            setTimeout(() => setFlashMessage(''), 2000);
        } else {
            setModalVisible(true);
        }
    };

    const handleEmailSubmit = () => {
        // Logic to send email
        console.log(`Email sent to: ${email}`);
        setFlashMessage('Email sent successfully!');
        setEmailSubmitted(true);
        setTimeout(() => {
            setFlashMessage('');
            setModalVisible(false);
        }, 2000);
    };

    const displayAnswers = quizData.map((question, index) => (
        <View key={index} style={styles.answerContainer}>
            <Text style={styles.answerText}>{question.question}</Text>
            <Text style={styles.answerText}>Correct Answer: {question.correctAnswer}</Text>
        </View>
    ));

    return (
        <View style={styles.container}>
            {quizCompleted ? (
                <View>
                    <Text style={styles.score}>Your Score: {score}</Text>
                    <Text style={styles.question}>Questions and Answers:</Text>
                    {displayAnswers}
                    <TouchableOpacity
                        style={styles.retestButton}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    {flashMessage ? <Text style={styles.flashMessage}>{flashMessage}</Text> : null}
                </View>
            ) : (
                <View>
                    <Text style={styles.question}>{quizData[currentQuestion].question}</Text>
                    <Text style={styles.timer}>Time Left: {timeLeft} sec</Text>
                    {quizData[currentQuestion].options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.option}
                            onPress={() => handleAnswer(option)}
                        >
                            <Text style={styles.buttonText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

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
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Button title="Submit" onPress={handleEmailSubmit} />
                    <Button title="Cancel" onPress={() => setModalVisible(false)} />
                    {flashMessage ? <Text style={styles.flashMessage}>{flashMessage}</Text> : null}
                </View>
            </Modal>
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
    score: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    question: {
        fontSize: 22,
        marginBottom: 20,
        color: '#333',
    },
    timer: {
        fontSize: 18,
        marginBottom: 20,
        color: '#ff0000',
    },
    option: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    retestButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    answerContainer: {
        marginBottom: 10,
    },
    answerText: {
        fontSize: 18,
        color: '#333',
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        width: '80%',
        paddingHorizontal: 10,
    },
    flashMessage: {
        marginTop: 15,
        color: 'green',
        fontSize: 16,
    },
});

export default Quiz;