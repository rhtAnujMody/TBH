import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {AppSVGs} from '../../assets';
import {useNavigation} from '@react-navigation/native';

type Props = {
  onPress?: () => void;
};

const AppBack = ({onPress}: Props) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <AppSVGs.back />
    </Pressable>
  );
};

export default AppBack;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '15%',
  },
});
