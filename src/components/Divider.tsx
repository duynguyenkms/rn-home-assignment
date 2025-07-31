import { StyleProp, Text, View, ViewStyle } from 'react-native';
import React, { useMemo } from 'react';
import { Color } from '@/themes';

type DividerProps = {
  direction: 'horizontal' | 'vertical';
  color?: string;
  size?: number;
};

const Divider = ({
  direction,
  color = Color.border,
  size = 1,
}: DividerProps) => {
  const style: StyleProp<ViewStyle> = useMemo(
    () => ({
      width: direction === 'horizontal' ? '100%' : size,
      height: direction === 'vertical' ? '100%' : size,
      backgroundColor: color,
    }),
    [direction, color, size],
  );

  return (
    <View style={style}>
      <Text>Divider</Text>
    </View>
  );
};

export { Divider };
