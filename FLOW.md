🔥 Workshop Flow
✅ Intro & Lecture (20 mins)
Goal: Set the stage — what we’re building and why React Native + Expo Go is great.

What is React Native?

What is Expo Go? (Instant testing on device!)

Walkthrough of npx create-expo-app

Show final Quiz Combat app

Explain learning goals: state, interactivity, media, animations

🧩 Session 1 (40 mins): Basic Quiz UI + State
Goal: Show a question, cycle on answer

Code Features:

useState

View, Text, TouchableOpacity

questions = require() from assets/data/questions.json

Mini Checkpoint:

Can see question text

Clicking button goes to next question

🧩 Session 2 (40 mins): Add Enemies + Score System
Goal: Add an enemy character and HP bar

Code Features:

useState for enemyHP, playerHP, score

Enemy from enemyPool

If correct: reduce enemyHP; if enemyHP hits 0, go to next enemy

Mini Checkpoint:

Can defeat enemy by answering right

Score goes up, defeated count shows

🧩 Session 3 (40 mins): Audio + Animations + Game Over
Goal: Polish with sounds, hit animation, and game reset

Code Features:

Add expo-av (npx expo install expo-av)

playSound() with .mp3 and .wav

Use Animated + useRef to scale enemy on hit

Use Alert.alert when playerHP hits 0

Mini Checkpoint:

Plays sounds and animates hit

Game Over and Restart works

🎯 Wrap-Up (10 mins)
Review what we built

Discuss possible extensions:

Add own questions

Add new monsters

Save high score with AsyncStorage

🧰 Prep You’ll Need:
✅ questions.json in assets/data

✅ slime.png, zombie.png, kill.wav, hit.wav, etc.

✅ GitHub repo ready for clone or starter zip for each session

