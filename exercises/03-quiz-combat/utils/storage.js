import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'QUIZ_COMBAT_SCORE';

export const saveHighScore = async (score) => {
  const prev = await AsyncStorage.getItem(KEY);
  if (!prev || score > parseInt(prev)) {
    await AsyncStorage.setItem(KEY, score.toString());
  }
};

export const getHighScore = async () => {
  return await AsyncStorage.getItem(KEY);
};
