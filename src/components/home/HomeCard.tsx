import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, typography} from '../../theme';

type Props = {
  icon: JSX.ElementType;
  title: string;
  marginRight: number;
  onPress: () => void;
};

const HomeCard = ({title, icon: Icon, marginRight, onPress}: Props) => {
  const styles = homeCardStyles(marginRight);

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

const homeCardStyles = (marginRight: number) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      height: 120,
      borderRadius: 10,
      backgroundColor: colors.palette.primary,
      shadowColor: '#000',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
      marginBottom: 10,
      marginRight: marginRight,
    },
    text: {
      textAlign: 'center',
      ...typography.medium(16),
    },
    imageContainer: {
      width: 60,
      height: 60,
      backgroundColor: 'white',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: -30,
    },
  });
};
