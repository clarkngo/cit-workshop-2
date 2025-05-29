# cit-workshop-2

Alternate
# Account Setup
1. Create an account with Expo at expo.dev
2. Open Snacks

npx create-expo-app quiz-combat -t tabs
npx expo install @react-native-async-storage/async-storage
npx expo install expo-av

npx expo start
npx expo start --tunnel

# Extra Deployment
## First Time
1. `npm install --global eas-cli`
2. `eas login`

## Deployment Step
1. `npx expo export --platform web`
2. `eas deploy`