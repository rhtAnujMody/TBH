import React, {useState} from 'react';
import {StyleSheet, Text, TextInputProps, View, ViewStyle} from 'react-native';
import {colors, typography} from '../../theme';
import CheckBox from '@react-native-community/checkbox';

interface Props extends TextInputProps {
  parentStyle?: ViewStyle;
  textHeader?: string;
  checked?: boolean;
}

const AppCheckBox = ({parentStyle, textHeader, checked, ...props}: Props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>{textHeader + ' : '}</Text>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={newValue => setToggleCheckBox(newValue)}
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
    ...typography.medium(12),
    alignSelf: 'center',
  },
});
