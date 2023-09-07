import React, {useState} from 'react';
import {StyleSheet, Text, TextInputProps, View, ViewStyle} from 'react-native';
import {colors, typography} from '../../theme';
import CheckBox from '@react-native-community/checkbox';

interface Props extends TextInputProps {
  textHeader?: string;
  selectedArray: number[];
  check: number;
}

const AppCheckBox = ({textHeader, selectedArray, check}: Props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const onSelect = (newValue: boolean) => {
    if (newValue === true) {
      setToggleCheckBox(newValue);
      selectedArray.push(check);
    } else {
      setToggleCheckBox(newValue);
      const indexToRemove = selectedArray.indexOf(check);
      if (indexToRemove !== -1) {
        selectedArray.splice(indexToRemove, 1);
      }
    }
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
    ...typography.medium(10),
    alignSelf: 'center',
  },
});
