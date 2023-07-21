import React, {RefObject} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {colors, typography} from '../../theme';

interface Props extends TextInputProps {
  parentStyle?: ViewStyle;
  placeHolder: string;
  icon?: JSX.ElementType | undefined;
  inputRef?: RefObject<TextInput>;
  hideInput?: boolean;
  otherText?: string;
  onPress?: () => void;
}

const AppTextInput = ({
  parentStyle,
  icon: LeftIcon,
  placeHolder,
  inputRef,
  hideInput,
  otherText,
  onPress,
  ...props
}: Props) => {
  return (
    <View style={[styles.container, parentStyle]}>
      {LeftIcon && <LeftIcon />}
      {hideInput ? (
        <Pressable
          style={styles.textContainer}
          onPress={() => {
            if (onPress) {
              onPress();
            }
          }}>
          <Text style={styles.otherTextValue(otherText ? false : true)}>
            {otherText ? otherText : placeHolder}
          </Text>
        </Pressable>
      ) : (
        <TextInput
          ref={inputRef}
          placeholderTextColor={'#B1B1B1'}
          selectionColor={colors.palette.primary}
          placeholder={placeHolder}
          style={styles.textInput}
          {...props}
        />
      )}
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E1E1E1',
    width: '100%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 30,
    overflow: 'hidden',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    height: '100%',
    paddingRight: 20,
    marginLeft: 20,
    ...typography.regular(14),
  },
  textContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  otherTextValue: (isPlaceHolder: boolean): TextStyle => ({
    marginLeft: 22,
    ...typography.regular(14),
    color: isPlaceHolder ? '#B1B1B1' : colors.palette.textColor,
  }),
});
