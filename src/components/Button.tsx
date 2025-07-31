import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, { useMemo } from 'react';
import { Color } from '@/themes';
import { Text } from './Text';

type ButtonType = 'solid' | 'outlined';

type ButtonProps = {
  type?: ButtonType;
  title: string;
  fullWidth?: boolean;
  enabled?: boolean;
  danger?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const Button = ({
  type = 'solid',
  title,
  fullWidth = false,
  enabled = true,
  danger = false,
  style,
  onPress,
}: ButtonProps) => {
  const buttonColor = danger ? Color.danger : Color.primary;

  const memoizedContainerStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      opacity: enabled ? 1 : 0.5,
      width: fullWidth ? '100%' : undefined,
      flexShrink: 1,
      backgroundColor: type === 'solid' ? buttonColor : undefined,
      borderWidth: type === 'outlined' ? 1 : 0,
      borderColor: buttonColor,
    }),
    [enabled, fullWidth, type, buttonColor],
  );

  const memoizedTitleStyle: StyleProp<TextStyle> = useMemo(
    () => ({
      color: type === 'solid' ? Color.surface : buttonColor,
    }),
    [buttonColor, type],
  );

  return (
    <TouchableOpacity
      disabled={!enabled}
      style={[styles.container, memoizedContainerStyle, style]}
      onPress={enabled ? onPress : undefined}>
      <Text style={memoizedTitleStyle} weight="medium">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export { Button };

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
