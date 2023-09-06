import React, {useState} from 'react';
import {StyleSheet, Text, TextInputProps, View, ViewStyle} from 'react-native';
import {typography} from '../theme';
import {AppCheckBox} from './common';

interface Props extends TextInputProps {
  parentStyle?: ViewStyle;
  textHeader?: string;
  data: {id: string; name: string}[];
  key: string;
}

const DoctorRow = ({parentStyle, textHeader, data, key, ...props}: Props) => {
  return (
    <View style={[styles.container, parentStyle]}>
      <Text style={styles.textHeader}>{textHeader}</Text>
      {data.map((item, index) => {
        return <AppCheckBox textHeader={item.name} />;
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
    ...typography.medium(17),
  },
});
