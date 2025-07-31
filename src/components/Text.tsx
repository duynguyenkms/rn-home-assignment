import {
  Text as RNText,
  StyleProp,
  TextStyle,
  type TextProps as RNTextProps,
} from 'react-native';
import React, { useMemo } from 'react';
import { FontSize, FontWeight } from '@/types';
import { Color } from '@/themes';
import { FONT_SIZE, TYPOGRAPHY_STYLES } from '@/constants';

type TextType = 'primary' | 'secondary' | 'danger';

type TextProps = RNTextProps & {
  weight?: FontWeight;
  size?: FontSize;
  type?: TextType;
};

const TEXT_COLORS: Record<TextType, string> = {
  primary: Color.text.primary,
  secondary: Color.text.secondary,
  danger: Color.danger,
};

const Text = ({
  weight = 'regular',
  size = 'regular',
  type = 'primary',
  style,
  children,
  ...restProps
}: TextProps) => {
  const memoizedStyle: StyleProp<TextStyle> = useMemo(() => {
    return {
      ...TYPOGRAPHY_STYLES[weight],
      fontSize: FONT_SIZE[size],
      color: TEXT_COLORS[type],
    };
  }, [weight, size, type]);

  return (
    <RNText style={[memoizedStyle, style]} {...restProps}>
      {children}
    </RNText>
  );
};

export { Text };
