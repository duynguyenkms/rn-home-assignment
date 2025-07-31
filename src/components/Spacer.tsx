import { StyleProp, View, ViewStyle } from 'react-native';
import React, { useMemo } from 'react';

type SpacerProps = {
  width?: number;
  height?: number;
};

const Spacer = ({ width, height }: SpacerProps) => {
  const style: StyleProp<ViewStyle> = useMemo(
    () => ({
      width: width,
      height: height,
    }),
    [width, height],
  );

  return <View style={style} />;
};

export { Spacer };
