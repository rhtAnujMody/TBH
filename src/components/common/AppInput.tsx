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
import { TouchableOpacity } from 'react-native';

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
  value?: string;
  onPress?: () => void;
}

const AppInput = ({
  parentStyle,
  icon: LeftIcon,
  rightIcon: RightIcon,
  placeHolder,
  inputRef,
  hideInput,
  keyboardType,
  textHeader,
  otherText,
  value,
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
console.log(onPress,'onpresss')
  return (
    <View style={{flex: 1}}>
      <Text style={styles.textHeader}>{textHeader}</Text>
      <View style={[styles.container, parentStyle, {borderColor: border}]}>
        {LeftIcon && <LeftIcon />}
        {hideInput ? (
          <TouchableWithoutFeedback
            style={styles.textContainer}
            //onPress={onPress}
            >
            <Text
              style={[
                styles.otherTextValue(otherText ? false : true),
                styles.leftIconStyle(LeftIcon ? true : false),
              ]}>
              {otherText ? otherText : placeHolder}
            </Text>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableOpacity onPress={onPress} style={styles.touchableInputContainer}>
            <View pointerEvents='none' >
          <TextInput
            ref={inputRef}
            placeholderTextColor={'#B1B1B1'}
            value={value}
            editable={false}
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
          </View>
          </TouchableOpacity>
        )}
        {RightIcon && (
          <View>
            <RightIcon />
          </View>
        )}
      </View>
    </View>);
};

export default AppInput;

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
  touchableInputContainer:{
    flex:1
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
