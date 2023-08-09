import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {typography} from '../../theme';

type Props = {
  icon: JSX.ElementType;
  title: string;
  marginRight?: number;
  onPress: () => void;
};

const HomeCard = ({title, icon: Icon, onPress}: Props) => {
  const styles = homeCardStyles();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Icon />
      </View>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default HomeCard;

const homeCardStyles = () => {
  return StyleSheet.create({
    container: {
      height: 50,
      borderRadius: 10,
      backgroundColor: 'white',
      shadowColor: '#000',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
      marginBottom: 10,
    },
    text: {
      textAlign: 'center',
      ...typography.medium(16),
    },
    imageContainer: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
