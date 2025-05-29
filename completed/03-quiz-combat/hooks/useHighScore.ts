import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'QUIZ_COMBAT_SCORE';

export function useHighScore(currentScore: number) {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    loadHighScore();
  }, []);

  useEffect(() => {
    if (currentScore > highScore) {
      setHighScore(currentScore);
      AsyncStorage.setItem(KEY, currentScore.toString());
    }
  }, [currentScore]);

  const loadHighScore = async () => {
    const saved = await AsyncStorage.getItem(KEY);
    if (saved) {
      setHighScore(parseInt(saved));
    }
  };

  return highScore;
}
