import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {StyleSheet, Text, TextInputProps, View, ViewStyle} from 'react-native';
import {colors, typography} from '../../theme';

interface Props extends TextInputProps {
  parentStyle?: ViewStyle;
  textHeader: string;
  onCheckChange: (value: boolean) => void;
  isChecked: boolean;
  isDisable: boolean;
}

const AppCheckBox = ({
  textHeader,
  onCheckChange,
  isChecked,
  isDisable = false,
}: Props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(isChecked);
  const onSelect = (newValue: boolean) => {
    setToggleCheckBox(newValue);
    onCheckChange(newValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>{textHeader + ' : '}</Text>
      <CheckBox
        disabled={isDisable}
        value={toggleCheckBox}
        onValueChange={onSelect}
        tintColors={{true: colors.palette.primary, false: colors.gray}}
        boxType="square"
        tintColor={colors.palette.primary}
        onTintColor={colors.palette.primary}
        animationDuration={0.2}
        onCheckColor={colors.gray}
        style={styles.checkBox}
      />
    </View>
  );
};

export default AppCheckBox;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingHorizontal: 10,
  },
  textHeader: {
    ...typography.medium(14),
    alignSelf: 'center',
    flex: 1,
  },
  checkBox: {marginVertical: 2},
});
