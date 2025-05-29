// app/(tabs)/quiz-combat.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { useHighScore } from '../../hooks/useHighScore';
import questionsData from '../../assets/data/questions.json';

const questions = questionsData.sort(() => 0.5 - Math.random()).slice(0, 15);

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
