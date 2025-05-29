import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);

    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
  };

  return (
    <View style={styles.container}>
      {showScore ? (
        <View>
          <Text style={styles.title}>Quiz Complete!</Text>
          <Text style={styles.score}>Your score: {score}/{questions.length}</Text>
          <TouchableOpacity onPress={restartQuiz} style={styles.button}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Question {currentIndex + 1}</Text>
          <Text style={styles.question}>{currentQuestion.question}</Text>
          {currentQuestion.options.map((option, index) => {
            const isCorrect = option === currentQuestion.answer;
            const isSelected = option === selectedOption;

            let optionStyle = styles.option;
            if (isSelected) {
              optionStyle = isCorrect ? styles.correct : styles.incorrect;
            }

            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleOptionPress(option)}
                style={optionStyle}
                disabled={!!selectedOption}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    padding: 15,
    backgroundColor: '#e0e0e0',
    marginVertical: 6,
    borderRadius: 10,
  },
  correct: {
    padding: 15,
    backgroundColor: '#b9fbc0',
    marginVertical: 6,
    borderRadius: 10,
  },
  incorrect: {
    padding: 15,
    backgroundColor: '#ffadad',
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
