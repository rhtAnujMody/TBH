import React from 'react';
import {StyleSheet, Text, TextInputProps, View, ViewStyle} from 'react-native';
import {typography} from '../theme';
import {AppCheckBox} from './common';

interface Props extends TextInputProps {
  parentStyle?: ViewStyle;
  textHeader?: string;
  data: {id: number; observation: string}[];
  selectedArray: number[];
}

const DoctorRow = ({parentStyle, textHeader, selectedArray, data}: Props) => {
  return (
    <View style={[styles.container, parentStyle]}>
      <Text style={styles.textHeader}>{textHeader}</Text>
      {data.map(item => {
        return (
          <AppCheckBox
            textHeader={item.observation}
            check={item.id}
            key={item.id}
            selectedArray={selectedArray}
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
    ...typography.medium(12),
  },
});
