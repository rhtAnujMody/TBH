import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
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
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Icon />
      </View>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
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
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
      marginBottom: 10,
    },
    text: {
      flex: 1,
      textAlign: 'left',
      flexWrap: 'wrap',
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
