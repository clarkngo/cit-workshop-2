// app/(tabs)/quiz-combat.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { useHighScore } from '../../hooks/useHighScore';

const questionBank = [
  { question: 'What is the primary function of a mobile backend server?', options: ['Serve UI elements', 'Handle business logic and data storage', 'Enhance GPU performance', 'Render native components'], answer: 'Handle business logic and data storage' },
  { question: 'Which of the following best describes REST?', options: ['Stateful API protocol', 'Database language', 'Architectural style for networked systems', 'Encryption protocol'], answer: 'Architectural style for networked systems' },
  { question: 'What is a key advantage of using a CDN in mobile apps?', options: ['Increases power consumption', 'Speeds up content delivery', 'Improves database queries', 'Renders animations'], answer: 'Speeds up content delivery' },
  { question: 'Why use caching in mobile app architecture?', options: ['To use more memory', 'To reduce latency and server load', 'To encrypt data', 'To slow down rendering'], answer: 'To reduce latency and server load' },
  { question: 'What component handles user authentication securely?', options: ['Frontend component', 'Session manager', 'OAuth provider', 'UI toolkit'], answer: 'OAuth provider' },
  { question: 'Which database type is best suited for real-time chat apps?', options: ['Relational DB', 'Graph DB', 'Time-series DB', 'NoSQL DB'], answer: 'NoSQL DB' },
  { question: 'What is load balancing?', options: ['Distributing traffic across multiple servers', 'Encrypting mobile data', 'Cleaning cache', 'Managing source control'], answer: 'Distributing traffic across multiple servers' },
  { question: 'Why is offline mode important in mobile apps?', options: ['Reduces app size', 'Improves animations', 'Provides usability without network', 'Encrypts passwords'], answer: 'Provides usability without network' },
  { question: 'What is the benefit of using Firebase in mobile apps?', options: ['UI rendering', 'Gesture recognition', 'Real-time database and authentication', 'GPU acceleration'], answer: 'Real-time database and authentication' },
  { question: 'What pattern separates concerns between UI and logic?', options: ['MVC/MVVM', 'OOP', 'DRY', 'CRUD'], answer: 'MVC/MVVM' },
  { question: 'Which service would be best to send push notifications?', options: ['CDN', 'OAuth', 'Firebase Cloud Messaging', 'Webhooks'], answer: 'Firebase Cloud Messaging' },
  { question: 'What does API rate limiting help prevent?', options: ['Fast app speed', 'Overuse of server resources', 'Offline usage', 'Session timeout'], answer: 'Overuse of server resources' },
  { question: 'Why should you use environment variables in mobile development?', options: ['To store private configuration like API keys', 'To boost battery life', 'To enhance animations', 'To replace Redux'], answer: 'To store private configuration like API keys' },
  { question: 'What is the best way to persist state locally on device?', options: ['Redux only', 'Cloud DB', 'AsyncStorage or SQLite', 'DOM Storage'], answer: 'AsyncStorage or SQLite' },
  { question: 'What role does a reverse proxy play in architecture?', options: ['Encrypt local files', 'Enhance battery performance', 'Forward client requests to backend servers', 'Improve UI performance'], answer: 'Forward client requests to backend servers' },
  // Add 35 more if needed
];

const questions = questionBank.sort(() => 0.5 - Math.random()).slice(0, 15);

const enemyPool = [
  { name: 'Slime', hp: 25, image: require('../../assets/images/slime.png') },
  { name: 'Skeleton', hp: 25, image: require('../../assets/images/skeleton.png') },
  { name: 'Zombie', hp: 50, image: require('../../assets/images/zombie.png') },
  { name: 'Goblin', hp: 50, image: require('../../assets/images/goblin.png') },
  { name: 'Mimic', hp: 100, image: require('../../assets/images/mimic.png') },
];

export default function QuizCombat() {
  useEffect(() => { playSound('battle'); }, []);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [enemyIndex, setEnemyIndex] = useState(0);
  const [enemyHP, setEnemyHP] = useState(enemyPool[0].hp);
  const [playerHP, setPlayerHP] = useState(100);
  const [score, setScore] = useState(0);
  const [defeatedCount, setDefeatedCount] = useState(0);
  const [bgColor, setBgColor] = useState('#111');
  const highScore = useHighScore(score);

  const enemyAnim = useRef(new Animated.Value(1)).current;

  const currentEnemy = enemyPool[enemyIndex % enemyPool.length];
  const currentQuestion = questions[questionIndex % questions.length];

  const triggerEnemyHit = () => {
    Animated.sequence([
      Animated.timing(enemyAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(enemyAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const playSound = async (type: 'hit' | 'hurt' | 'gameover' | 'battle' | 'kill') => {
  const soundMap = {
    hit: require('../../assets/sounds/hit.wav'),
    hurt: require('../../assets/sounds/hurt.wav'),
    gameover: require('../../assets/sounds/gameover.wav'),
    battle: require('../../assets/sounds/battle.mp3'),
    kill: require('../../assets/sounds/kill.wav'),
  };
  const { sound } = await Audio.Sound.createAsync(soundMap[type]);
  if (type === 'battle') {
    await sound.setIsLoopingAsync(true);
    await sound.setVolumeAsync(0.6);
  }
  await sound.playAsync();
};

  const flashBackground = (color: string) => {
    setBgColor(color);
    setTimeout(() => setBgColor('#111'), 300);
  };

  const handleAnswer = (selected: string) => {
    const isCorrect = selected === currentQuestion.answer;
    if (isCorrect) {
      flashBackground('green');
      playSound('hit');
      setEnemyHP(hp => {
        const newHP = Math.max(0, hp - 25);
        if (newHP === 0) {
          playSound('kill');
          setEnemyIndex(i => i + 1);
          setDefeatedCount(c => c + 1);
          setEnemyHP(enemyPool[(enemyIndex + 1) % enemyPool.length].hp);
        }
        return newHP;
      });
      setScore(s => s + 10);
      triggerEnemyHit();
    } else {
      flashBackground('red');
      playSound('hurt');
      setPlayerHP(hp => Math.max(0, hp - 25));
    }
    setQuestionIndex(i => i + 1);
  };

  useEffect(() => {
    if (playerHP === 0) {
      playSound('gameover');
      Alert.alert(
        'Game Over',
        `Final Score: ${score}\nEnemies Defeated: ${defeatedCount}`,
        [
          {
            text: 'Restart',
            onPress: () => {
              setPlayerHP(100);
              setEnemyHP(enemyPool[0].hp);
              setEnemyIndex(0);
              setDefeatedCount(0);
              setScore(0);
              setQuestionIndex(0);
            },
          },
        ]
      );
    }
  }, [playerHP]);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.stats}>🧍 Player HP: {playerHP}</Text>
      <Text style={styles.stats}>🧟 {currentEnemy.name} HP: {enemyHP}</Text>
      <Text style={styles.stats}>💀 Defeated: {defeatedCount}</Text>
      <Text style={styles.stats}>🏆 Score: {score} | High: {highScore}</Text>

      <Animated.Image source={currentEnemy.image} style={[styles.enemy, { transform: [{ scale: enemyAnim }] }]} />

      <Text style={styles.question}>{currentQuestion.question}</Text>
      {currentQuestion.options.map((opt, i) => (
        <TouchableOpacity key={i} onPress={() => handleAnswer(opt)} style={styles.option}>
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  stats: { color: 'white', fontSize: 16, marginVertical: 2 },
  question: { color: 'white', fontSize: 18, marginVertical: 20 },
  option: { backgroundColor: '#333', padding: 12, marginVertical: 5, borderRadius: 8 },
  optionText: { color: 'white', fontSize: 16 },
  enemy: { width: 120, height: 120, alignSelf: 'center', marginVertical: 30 },
});
