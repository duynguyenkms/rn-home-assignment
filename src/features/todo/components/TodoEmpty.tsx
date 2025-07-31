import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components';
import { SvgImages } from '@/assets/images';

const TodoEmpty = () => {
  return (
    <View style={styles.container}>
      <SvgImages.EmptyTask width={150} height={150} />
      <Text size="medium" weight="semiBold" type="secondary">
        You don't have any task yet
      </Text>
      <Text type="secondary">Tap "+" to add one</Text>
    </View>
  );
};

export { TodoEmpty };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
