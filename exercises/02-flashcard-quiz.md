Check the Problems tab and fill in the blanks
1. Right-click at `exercises` then click Open in Integrated Terminal
2. `npx create-expo-app@latest 02-flashcard-quiz`
3. Paste this code and fix it:
```import React, { _____1_____ /* 💡 Hook for managing state */ } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Sample list of questions with options and answers
const questions = [
  {
    question: 'What is the purpose of useState in React Native?',
    options: [
      'To create animations',
      'To define component styles',
      'To manage state in a functional component',
      'To handle navigation'
    ],
    answer: 'To manage state in a functional component',
  },
  ...
];

export default function FlashcardQuiz() {
  const [currentIndex, setCurrentIndex] = _____2_____(0); // 💡 This hook starts at question 0
  const [selectedOption, setSelectedOption] = useState(_____3_____); // 💡 No answer selected at first
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    if (option === currentQuestion.____4_____) { // 💡 This key holds the correct option
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions._____5_____) { // 💡 How many questions total?
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
    setSelectedOption(null);
    setShowScore(_____6_____); // 💡 Restarting means score is hidden again
  };

  return (
    <View style={styles.container}>
      {showScore ? (
        <View>
          <Text style={styles.title}>Quiz Complete!</Text>
          <Text style={styles.score}>
            Your score: {score}/{questions.length}
          </Text>
          <TouchableOpacity style={styles.button} onPress={_____7_____ /* 💡 Which function restarts the game? */}>
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      ) : (
        ...
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

```