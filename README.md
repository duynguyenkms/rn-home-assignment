# 🎯 Todo App

| Demonstration       |
| ------------------- |
| <img src="https://github.com/user-attachments/assets/47d2f236-4ea9-4e5b-8f8c-68321b36e13e" width="300" />|

This project using [`@react-native-community/cli`](https://github.com/react-native-community/cli) as a starter template.

#### Technical stack:

- React Native `0.79.5`
- React `19.0.0`
- State Management: 🐻 Zustand (https://github.com/pmndrs/zustand). It's simple, easy to use and reduce boilerplate
- Storage:
  - `react-native-mmkv` (https://github.com/mrousavy/react-native-mmkv). Fast storage written in pure C++ with fully JSI support
  - `react-native-keys` (https://github.com/numandev1/react-native-keys) to protect secret keys

## I. Guide to run app

#### 1. Install dependencies

```sh
# Using npm
npm install

# OR using Yarn
yarn
```

#### 2. Start Metro Dev Server

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

#### 3. Run app

##### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

##### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

**Notes:** To run the above command, make sure your machine already installed ruby >= 2.6.10

Then, and every time you update your native dependencies, run:

```sh
# Using npm
npm run pod-install

# OR using Yarn
yarn pod-install
```

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## II. Unit test

To run unit test, execute this command:

```sh
# Using npm
npm run test

# OR using Yarn
yarn test
```

## III. Integrate Expo Modules to bare React Native project

> Currently, Expo SDK 53 (latest stable version) only supports React Native <= 0.79, so I choose React Native `0.79.5` for this project. See https://expo.dev/changelog/react-native-80

To be able to use expo modules such as `expo-local-authentication` package, we need to take some extra steps to setup **Expo Modules**

I have followed this instruction: https://docs.expo.dev/bare/installing-expo-modules/#manual-installation to integrate expo modules to bare React Native project
