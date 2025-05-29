// app/(tabs)/index.tsx
// This is the main screen for Session 1: Flashcard Quiz Basics
// It uses useState to manage quiz progression and score state

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Sample list of questions with options and answers
const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Madrid', 'Berlin', 'Paris', 'Rome'],
    answer: 'Paris',
  },
  {
    question: 'Which language is used for React Native?',
    options: ['Swift', 'Java', 'JavaScript', 'Kotlin'],
    answer: 'JavaScript',
  },
  {
    question: 'Who developed the theory of relativity?',
    options: ['Newton', 'Tesla', 'Einstein', 'Edison'],
    answer: 'Einstein',
  },
];

export default function FlashcardQuiz() {
  // React state hooks to track question index, selected option, score, and whether quiz is finished
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const currentQuestion = questions[currentIndex];

  // Handles answer selection and advances to next question after a short delay
  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }
    // Delay before moving to the next question to allow visual feedback
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  // Resets the quiz to start again
  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowScore(false);
  };

  return (
    <View style={styles.container}>
      {showScore ? (
        // Final screen with score and restart button
        <View>
          <Text style={styles.title}>Quiz Complete!</Text>
          <Text style={styles.score}>Your score: {score}/{questions.length}</Text>
          <TouchableOpacity style={styles.button} onPress={restartQuiz}>
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Main quiz question and answer options
        <View>
          <Text style={styles.title}>Question {currentIndex + 1}</Text>
          <Text style={styles.question}>{currentQuestion.question}</Text>
          {currentQuestion.options.map((option, idx) => {
            const isCorrect = option === currentQuestion.answer;
            const isSelected = selectedOption === option;
            const optionStyle = isSelected
              ? isCorrect ? styles.correct : styles.incorrect
              : styles.option;
            return (
              <TouchableOpacity
                key={idx}
                style={optionStyle}
                onPress={() => handleOptionPress(option)}
                disabled={!!selectedOption} // disable after answering
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

// Simple inline styling using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#eee',
    padding: 15,
    marginVertical: 6,
    borderRadius: 10,
  },
  correct: {
    backgroundColor: '#b9fbc0',
    padding: 15,
    marginVertical: 6,
    borderRadius: 10,
  },
  incorrect: {
    backgroundColor: '#ffadad',
    padding: 15,
    marginVertical: 6,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  score: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#4d96ff',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
