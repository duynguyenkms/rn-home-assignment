import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Spacer, Text } from '@/components';
import { Images } from '@/assets/images';

type CompletedTaskEmptyProps = {
  onActionPress: () => void;
};

const CompletedTaskEmpty = ({ onActionPress }: CompletedTaskEmptyProps) => {
  return (
    <View style={styles.container}>
      <Images.EmptyTask width={150} height={150} />
      <Text size="medium" weight="semiBold" type="secondary">
        You don't completed any task
      </Text>
      <Spacer height={12} />
      <Button title="View Todo" onPress={onActionPress} />
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
});
