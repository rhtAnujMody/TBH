import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppBack from './AppBack';
import {colors, typography} from '../../theme';

type Props = {
  title?: string;
};

const Header = ({title}: Props) => {
  return (
    <View style={styles.container}>
      <AppBack />
      <Text style={styles.header}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.palette.primary,
  },
  header: {
    ...typography.bold(14),
  },
});
