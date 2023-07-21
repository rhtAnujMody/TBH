import React from 'react';
import {
  ActivityIndicator,
  DimensionValue,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {colors, typography} from '../../theme';

type Props = {
  style?: ViewStyle;
  textStyle?: TextStyle;
  isLoading?: boolean;
  title: string;
  width?: DimensionValue;
  enabled?: boolean;
  onPress: () => void;
};

const AppButton = ({
  style,
  textStyle,
  isLoading,
  title,
  width,
  enabled = true,
  onPress,
}: Props) => {
  const styles = appButtonStyle(width, enabled);

  const handleOnPress = () => {
    if (!isLoading && enabled) {
      onPress();
    }
  };
  const Container = enabled ? TouchableOpacity : Pressable;
  return (
    <Container style={[styles.container, style]} onPress={handleOnPress}>
      {isLoading ? (
        <ActivityIndicator color={colors.palette.primary} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </Container>
  );
};

export default AppButton;

const appButtonStyle = (width: DimensionValue = '100%', enabled: boolean) => {
  return StyleSheet.create({
    container: {
      width: width,
      backgroundColor: enabled ? colors.black : 'grey',
      height: 50,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 0,
    },
    text: {
      ...typography.medium(16, 'white'),
    },
  });
};
