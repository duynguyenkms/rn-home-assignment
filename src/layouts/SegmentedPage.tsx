import { NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import SegmentedControl, {
  NativeSegmentedControlIOSChangeEvent,
} from '@react-native-segmented-control/segmented-control';
import { Spacer } from '@/components';
import { Typography } from '@/themes';

type SegmentedItem = {
  title: string;
  render: () => React.ReactNode;
};

type SegmentedPageProps = {
  selectedIndex: number;
  onChange: (index: number) => void;
  items: SegmentedItem[];
};

const SegmentedPage = ({
  selectedIndex,
  items,
  onChange,
}: SegmentedPageProps) => {
  const titles = useMemo(() => {
    return items.map(item => item.title);
  }, [items]);

  const handleOnChange = useCallback(
    (event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>) => {
      onChange(event.nativeEvent.selectedSegmentIndex);
    },
    [onChange],
  );

  return (
    <>
      <SegmentedControl
        values={titles}
        selectedIndex={selectedIndex}
        fontStyle={Typography.medium}
        onChange={handleOnChange}
      />
      <Spacer height={12} />
      <View style={styles.container}>{items[selectedIndex].render()}</View>
    </>
  );
};

export { SegmentedPage };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
