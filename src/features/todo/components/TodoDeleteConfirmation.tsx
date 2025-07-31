import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, Spacer, Text } from '@/components';

type TodoDeleteConfirmationProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const TodoDeleteConfirmation = ({
  onCancel,
  onConfirm,
}: TodoDeleteConfirmationProps) => {
  return (
    <>
      <Spacer height={12} />
      <Text style={styles.description}>
        Are you sure you want to delete this todo?
      </Text>
      <Spacer height={16} />
      <View style={styles.actionContainer}>
        <Button
          type="outlined"
          title="No"
          fullWidth
          danger
          onPress={onCancel}
        />
        <Button title="Yes" fullWidth danger onPress={onConfirm} />
      </View>
    </>
  );
};

export { TodoDeleteConfirmation };

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    gap: 12,
    flexShrink: 1,
  },
  description: {
    textAlign: 'center',
  },
});
