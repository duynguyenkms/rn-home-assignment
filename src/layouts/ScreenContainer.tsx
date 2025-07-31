import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header, LoadingView, Spacer } from '@/components';
import { Color } from '@/themes';

type ScreenContainerProps = React.PropsWithChildren<{
  title?: string;
  loading?: boolean;
  fab?: React.ReactNode;
  action?: React.ReactNode;
}>;

const ScreenContainer = ({
  loading = false,
  title,
  fab,
  action,
  children,
}: ScreenContainerProps) => {
  const insets = useSafeAreaInsets();

  const memoizedContainerStyle: StyleProp<ViewStyle> = React.useMemo(
    () => ({
      flex: 1,
      paddingBottom: insets.bottom,
      backgroundColor: Color.background,
    }),
    [insets],
  );

  const memoizedFabWrapperStyle: StyleProp<ViewStyle> = React.useMemo(
    () => ({
      position: 'absolute',
      bottom: insets.bottom + 48,
      right: 16,
    }),
    [insets],
  );

  return (
    <>
      <View style={memoizedContainerStyle}>
        <Header title={title} action={action} />
        <Spacer height={12} />
        <View style={styles.childrenWrapper}>{children}</View>
        {fab && <View style={memoizedFabWrapperStyle}>{fab}</View>}
      </View>
      {loading && (
        <View style={styles.loadingView}>
          <LoadingView />
        </View>
      )}
    </>
  );
};

export { ScreenContainer };

const styles = StyleSheet.create({
  childrenWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  fabWrapper: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  loadingView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
