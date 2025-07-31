import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleProp,
  ViewStyle,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  Platform,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { Color, Typography } from '@/themes';
import { Text } from './Text';
import { Spacer } from './Spacer';

type TextInputProps = RNTextInputProps & {
  label?: string;
};

const TextInput = React.forwardRef<RNTextInput, TextInputProps>(
  ({ label, onBlur, ...restProps }, ref) => {
    const [focused, setFocused] = useState<boolean>(false);

    const dynamicContainerStyle: StyleProp<ViewStyle> = {
      borderColor: focused ? Color.primary : Color.border,
      borderWidth: focused ? 1.5 : 1,
    };

    const handleFocus = useCallback(() => {
      setFocused(true);
    }, []);

    const handleBlur = useCallback(
      (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(false);
        onBlur?.(event);
      },
      [onBlur],
    );

    return (
      <>
        {label && (
          <>
            <Text weight="light">{label}</Text>
            <Spacer height={4} />
          </>
        )}
        <RNTextInput
          ref={ref}
          style={[styles.container, dynamicContainerStyle]}
          cursorColor={Color.primary}
          selectionColor={Color.primary}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...restProps}
        />
      </>
    );
  },
);

export { TextInput };

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontFamily: Typography.light.fontFamily,
    lineHeight: Platform.OS === 'ios' ? 0 : undefined,
  },
});
