import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Color } from '@/themes';
import { Text } from './Text';

const VERTICAL_PADDING = 12;
const HORIZONTAL_PADDING = 16;

type HeaderProps = {
  title?: string;
  action?: React.ReactNode;
};

const Header = ({ title, action = [] }: HeaderProps) => {
  const insets = useSafeAreaInsets();

  const memoizedContainerStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      paddingTop: insets.top + VERTICAL_PADDING,
      paddingBottom: VERTICAL_PADDING,
      paddingHorizontal: HORIZONTAL_PADDING,
    }),
    [insets],
  );

  return (
    <View style={[memoizedContainerStyle, styles.container]}>
      <Text weight="semiBold" size="large">
        {title}
      </Text>
      {action && <View style={styles.actionContainer}>{action}</View>}
    </View>
  );
};

export { Header };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    backgroundColor: Color.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    justifyContent: 'center',
  },
  actionContainer: {
    position: 'absolute',
    right: HORIZONTAL_PADDING,
    bottom: VERTICAL_PADDING,
    flexDirection: 'row',
  },
});
