module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Configure path alias to make the import statement more cleaner
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    // Plugin to work with `react-native-reanimated`
    'react-native-worklets/plugin',
  ],
};
