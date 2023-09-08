import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {StyleSheet, Text, TextInputProps, View, ViewStyle} from 'react-native';
import {colors, typography} from '../../theme';

interface Props extends TextInputProps {
  parentStyle?: ViewStyle;
  textHeader: string;
  onCheckChange: (value: boolean) => void;
}

const AppCheckBox = ({textHeader, onCheckChange}: Props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const onSelect = (newValue: boolean) => {
    setToggleCheckBox(newValue);
    onCheckChange(newValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>{textHeader + ' : '}</Text>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={onSelect}
        tintColors={{true: colors.palette.primary, false: colors.gray}}
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
});
