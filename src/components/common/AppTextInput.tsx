import React, {RefObject, useState} from 'react';
import {
  Image,
  KeyboardType,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {colors, typography} from '../../theme';

const EyeIcon = ({isVisible}: {isVisible: boolean}) => {
  return (
    <Image
      source={
        isVisible
          ? require('../../assets/hide.png')
          : require('../../assets/view.png')
      }
      style={{
        height: 22,
        width: 22,
      }}
    />
  );
};

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
  onPress?: () => void;
  isPassword?: boolean;
  errorMessage?: string;
  isMandatory?: boolean;
  units?: string;
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
  isPassword,
  errorMessage,
  isMandatory,
  units,
  ...props
}: Props) => {
  const [border, setBorder] = useState(colors.gray);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const customOnFocus = () => {
    props?.onFocus;
    setBorder(colors.palette.primary);
  };
  const customOnBlur = () => {
    props?.onBlur;
    setBorder(colors.gray);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  return textHeader ? (
    <View style={{flex: 1}}>
      <Text style={styles.textHeader}>
        {textHeader} {isMandatory && <Text style={{color: 'red'}}>*</Text>}
      </Text>
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
          <>
            <TextInput
              ref={inputRef}
              placeholderTextColor={'#B1B1B1'}
              selectionColor={colors.palette.primary}
              placeholder={placeHolder}
              style={[
                styles.textInput,
                styles.leftIconStyle(LeftIcon ? true : false),
                isPassword && styles.passwordInput,
              ]}
              secureTextEntry={isPassword && !isPasswordVisible}
              keyboardType={keyboardType}
              onFocus={customOnFocus}
              onBlur={customOnBlur}
              {...props}
            />
            {isPassword && (
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.eyeIcon}>
                <EyeIcon isVisible={isPasswordVisible} />
              </TouchableOpacity>
            )}
          </>
        )}
        {units && (
          <Text
            style={{
              ...typography.regular(14),
              color: colors.black,
              marginLeft: 'auto',
            }}>
            {units}
          </Text>
        )}
        {RightIcon && !isPassword && (
          <TouchableWithoutFeedback onPress={onPress}>
            <RightIcon />
          </TouchableWithoutFeedback>
        )}
      </View>
      {errorMessage && (
        <Text style={styles.errorMessageStyle}>{errorMessage}</Text>
      )}
    </View>
  ) : (
    <>
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
              style={[
                styles.textInput,
                styles.leftIconStyle(LeftIcon ? true : false),
                isPassword && styles.passwordInput,
              ]}
              secureTextEntry={isPassword && !isPasswordVisible}
              keyboardType={keyboardType}
              onFocus={customOnFocus}
              onBlur={customOnBlur}
              {...props}
            />
            {isPassword && (
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.eyeIcon}>
                <EyeIcon isVisible={isPasswordVisible} />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      {errorMessage && (
        <Text style={styles.errorMessageStyle}>{errorMessage}</Text>
      )}
    </>
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
    paddingRight: 20,
    marginLeft: 20,
    ...typography.regular(14),
    width: '100%',
  },
  textHeader: {
    ...typography.medium(12),
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
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    height: '100%',
    justifyContent: 'center',
  },
  errorMessageStyle: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: -5,
    marginBottom: 5,
    ...typography.regular(10, 'red'),
  },
});
