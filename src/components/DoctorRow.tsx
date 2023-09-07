import React from 'react';
import {StyleSheet, Text, TextInputProps, View, ViewStyle} from 'react-native';
import {typography} from '../theme';
import {AppCheckBox} from './common';
import {DoctorObservationInner} from '../models/UserModal';
import Utility from '../utils/Utility';

interface Props extends TextInputProps {
  parentStyle?: ViewStyle;
  textHeader?: string;
  data: DoctorObservationInner[];
}

const onCheckChange = (value: boolean, item: DoctorObservationInner) => {
  item.isSelected = value;
  Utility.logData(item);
};

const DoctorRow = ({parentStyle, textHeader, data}: Props) => {
  return (
    <View style={[styles.container, parentStyle]}>
      <Text style={styles.textHeader}>{textHeader}</Text>
      {data.map(item => {
        return (
          <AppCheckBox
            textHeader={item.observation}
            key={item.id}
            onCheckChange={value => {
              onCheckChange(value, item);
            }}
          />
        );
      })}
    </View>
  );
};

export default DoctorRow;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textHeader: {
    ...typography.bold(16),
  },
});
