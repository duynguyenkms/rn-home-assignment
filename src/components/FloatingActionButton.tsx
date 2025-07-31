import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { type PropsWithChildren } from 'react';
import { Color } from '@/themes';

type FloatingActionButtonProps = PropsWithChildren<{
  onPress?: () => void;
}>;

const FloatingActionButton = ({
  onPress,
  children,
}: FloatingActionButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>{children}</View>
    </TouchableOpacity>
  );
};

export { FloatingActionButton };

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100%',
    width: 54,
    height: 54,
    backgroundColor: Color.primary,
    shadowColor: '#a693d3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 27,
    elevation: 8,
  },
});
