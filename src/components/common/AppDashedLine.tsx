import React from 'react';
import {View, ViewStyle} from 'react-native';
import {colors} from '../../theme';

type Props = {
  style?: ViewStyle;
};

const AppDashedLine = ({style}: Props) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: colors.gray,
        borderRadius: 1,
      }}></View>
  );
};

export default AppDashedLine;
