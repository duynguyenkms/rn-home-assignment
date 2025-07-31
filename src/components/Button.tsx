import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, { useMemo } from 'react';
import { Color } from '@/themes';
import { Text } from './Text';

type ButtonProps = {
  title: string;
  fullWidth?: boolean;
  enabled?: boolean;
  onPress?: () => void;
};

const Button = ({
  title,
  fullWidth = false,
  enabled = true,
  onPress,
}: ButtonProps) => {
  const memoizedContainerStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      alignSelf: fullWidth ? 'stretch' : undefined,
      opacity: enabled ? 1 : 0.5,
    }),
    [fullWidth, enabled],
  );

  return (
    <TouchableOpacity
      disabled={!enabled}
      style={[styles.container, memoizedContainerStyle]}
      onPress={enabled ? onPress : undefined}>
      <Text style={styles.title} weight="medium">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export { Button };

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Color.surface,
  },
});
