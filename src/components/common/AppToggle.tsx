import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors, typography} from '../../theme';

type Props = {
  title?: string;
  children?: React.ReactNode;
};
function AppToggle({title, children}: Props) {
  const [toggle, setToggle] = useState(false);

  const toggleView = () => {
    setToggle(prev => !prev);
  };
  return (
    <>
      <TouchableOpacity onPress={toggleView} style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <Image
          source={require('../../assets/right.png')}
          style={[
            styles.image,
            toggle
              ? {transform: [{rotate: '0deg'}]}
              : {transform: [{rotate: '90deg'}]},
          ]}
        />
      </TouchableOpacity>
      {toggle && children}
    </>
  );
}
const styles = StyleSheet.create({
  title: {
    ...typography.bold(16),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  image: {
    height: 20,
    width: 20,
  },
});
export default AppToggle;
