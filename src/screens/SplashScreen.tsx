import React from 'react';
import {View} from 'react-native';
import {AppSVGs} from '../assets';
import {colors} from '../theme';

type Props = {};

function SplashScreen({}: Props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 400,
          height: 400,
          position: 'absolute',
          left: -200,
          bottom: -200,
          borderRadius: 200,
          backgroundColor: colors.palette.primary,
        }}
      />

      <View
        style={{
          width: 200,
          height: 200,
          position: 'absolute',
          right: -100,
          top: -90,
          borderRadius: 100,
          backgroundColor: colors.palette.primary,
        }}
      />

      <AppSVGs.logo />
    </View>
  );
}

export default SplashScreen;
