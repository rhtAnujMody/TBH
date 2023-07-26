import React, {RefObject, useState} from 'react';
import {
  KeyboardType,
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
  rightIcon?: JSX.ElementType | undefined;
  inputRef?: RefObject<TextInput>;
  hideInput?: boolean;
  keyboardType?: KeyboardType;
  otherText?: string;
  textHeader?: string;
  onPress?: () => void;
}

const AppTextInput = ({
  parentStyle,
  icon: LeftIcon,
  rightIcon: RightIcon,
  placeHolder,
  inputRef,
  hideInput,
  keyboardType,
  textHeader,
  otherText,
  onPress,
  ...props
}: Props) => {
  const [border, setBorder] = useState(colors.gray);

  const customOnFocus = () => {
    props?.onFocus;
    setBorder(colors.palette.primary);
  };
  const customOnBlur = () => {
    props?.onBlur;
    setBorder(colors.gray);
  };

  return textHeader ? (
    <View>
      <Text style={styles.textHeader}>{textHeader}</Text>
      <View style={[styles.container, parentStyle, {borderColor: border}]}>
        {LeftIcon && <LeftIcon />}
        {hideInput ? (
          <Pressable
            style={styles.textContainer}
            onPress={() => {
              if (onPress) {
                onPress();
              }
            }}>
            <Text
              style={[
                styles.otherTextValue(otherText ? false : true),
                {marginLeft: LeftIcon ? 20 : 0},
              ]}>
              {otherText ? otherText : placeHolder}
            </Text>
          </Pressable>
        ) : (
          <TextInput
            ref={inputRef}
            placeholderTextColor={'#B1B1B1'}
            selectionColor={colors.palette.primary}
            placeholder={placeHolder}
            style={[styles.textInput, {marginLeft: LeftIcon ? 20 : 0}]}
            keyboardType={keyboardType}
            onFocus={customOnFocus}
            onBlur={customOnBlur}
            {...props}
          />
        )}
        {RightIcon && (
          <View>
            <RightIcon />
          </View>
        )}
      </View>
    </View>
  ) : (
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
  textHeader: {
    ...typography.medium(10),
    marginBottom: 6,
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
