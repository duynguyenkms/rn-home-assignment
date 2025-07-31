import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Spacer, Text } from '@/components';
import { Images } from '@/assets/images';

type CompletedTaskEmptyProps = {
  onActionPress: () => void;
};

const CompletedTaskEmpty = ({ onActionPress }: CompletedTaskEmptyProps) => {
  return (
    <View style={styles.container}>
      <Image source={Images.Checklist} style={styles.image} />
      <Spacer height={12} />
      <Text size="medium" weight="semiBold" type="secondary">
        You haven't completed any task
      </Text>
      <Spacer height={12} />
      <Button title="Complete Now" onPress={onActionPress} />
    </View>
  );
};

export { CompletedTaskEmpty };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});
