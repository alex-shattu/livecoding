import { View } from 'react-native';
import React from 'react';
import sizes from '../../constants/sizes';

type SpacerProps = {
  width?: number;
  height?: number;
};

const Spacer = ({ width = 0, height = 0 }: SpacerProps) => {
  return (
    <View style={{ width: sizes.step * width, height: sizes.step * height }} />
  );
};

export default React.memo(Spacer);
