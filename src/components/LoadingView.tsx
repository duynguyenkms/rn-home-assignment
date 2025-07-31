import { Color } from '@/themes';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const LoadingView = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Color.surface} />
    </View>
  );
};

export { LoadingView };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    opacity: 0.5,
  },
});
