import React, {RefObject, useState} from 'react';
import {
  KeyboardType,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableWithoutFeedback,
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
  leftText?: string;
  errorMessage?: string;
  onPress?: () => void;
  onFocusValidation?: (input: string) => void;
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
  leftText,
  errorMessage,
  ...props
}: Props) => {
  const [border, setBorder] = useState(colors.gray);
  const [touched, setTouched] = useState(false);

  const customOnFocus = () => {
    setTouched(true);
    props?.onFocus;
    setBorder(colors.palette.primary);
  };
  const customOnBlur = () => {
    props?.onBlur;
    setBorder(colors.gray);
  };

  return textHeader ? (
    <View style={{flex: 1}}>
      <Text style={styles.textHeader}>{textHeader}</Text>
      <View style={[styles.container, parentStyle, {borderColor: border}]}>
        {leftText && <Text style={{...typography.medium(12)}}>{leftText}</Text>}
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
                styles.leftIconStyle(LeftIcon ? true : false),
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
            style={[
              styles.textInput,
              styles.leftIconStyle(LeftIcon ? true : false),
            ]}
            keyboardType={keyboardType}
            onFocus={customOnFocus}
            onBlur={customOnBlur}
            {...props}
          />
        )}
        {RightIcon && (
          <TouchableWithoutFeedback onPress={onPress}>
            <RightIcon />
          </TouchableWithoutFeedback>
        )}
      </View>
      {errorMessage !== '' && touched ? (
        <Text style={{color: 'red', marginTop: -10, fontSize: 12}}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  ) : (
    <View>
      <View style={[styles.container, parentStyle]}>
        {leftText && <Text style={{...typography.medium(12)}}>{leftText}</Text>}
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
          <>
            <TextInput
              ref={inputRef}
              placeholderTextColor={'#B1B1B1'}
              selectionColor={colors.palette.primary}
              placeholder={placeHolder}
              style={styles.textInput}
              {...props}
              onFocus={customOnFocus}
              onBlur={customOnBlur}
            />
          </>
        )}
      </View>
      {errorMessage !== '' && touched ? (
        <Text style={{color: 'red', marginTop: -10, fontSize: 12}}>
          {errorMessage}
        </Text>
      ) : null}
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
  leftIconStyle: (isLeftIcon: boolean) => ({
    marginLeft: isLeftIcon ? 20 : 0,
  }),
  otherTextValue: (isPlaceHolder: boolean): TextStyle => ({
    marginLeft: 22,
    ...typography.regular(14),
    color: isPlaceHolder ? '#B1B1B1' : colors.palette.textColor,
  }),
});
