import {Dimensions, TextStyle} from 'react-native';
import {colors} from './colors';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const dpRatio = screenWidth / 375;

const normalizeFontSize = (size: number) => {
  const normalizedSize = size * dpRatio;
  return normalizedSize;
};

export const typography = {
  regular: (
    size: number = normalizeFontSize(14),
    textColor: string = colors.palette.textColor,
  ): TextStyle => ({
    fontSize: size,
    color: textColor,
  }),
  medium: (
    size: number = normalizeFontSize(16),
    textColor: string = colors.palette.textColor,
  ): TextStyle => ({
    fontSize: size,
    color: textColor,
    fontWeight: '600',
  }),
  bold: (
    size: number,
    textColor: string = colors.palette.textColor,
  ): TextStyle => ({
    fontSize: normalizeFontSize(size),
    color: textColor,
    fontWeight: '800',
  }),
};
