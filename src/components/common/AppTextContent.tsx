import React from 'react';
import {StyleSheet, Text, TextInputProps, View, ViewStyle} from 'react-native';
import {colors, typography} from '../../theme';

interface Props extends TextInputProps {
  parentStyle?: ViewStyle;
  textHeader?: string;
  textContent?: string;
}

const AppTextContent = ({
  parentStyle,
  textHeader,
  textContent,
  ...props
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>{textHeader + ' : '}</Text>
      <Text style={styles.textContent}>{textContent}</Text>
    </View>
  );
};

export default AppTextContent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    padding: 10,
  },
  textHeader: {
    flex: 1,
    ...typography.medium(12),
  },
  textContent: {
    flex: 0.4,
    ...typography.regular(12),
  },
});
