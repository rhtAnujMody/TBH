import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import {typography} from '../../theme';

type Props = {
  title?: string;
  children?: React.ReactNode;
};

export type AppToggleRef = {
  toggle: (toggle: boolean) => void;
};

const AppToggle = forwardRef<AppToggleRef, Props>(({title, children}, ref) => {
  const [toggle, setToggle] = useState(false);

  // Enable LayoutAnimation on Android
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleView = (toggle: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setToggle(toggle);
  };

  useImperativeHandle(ref, () => ({
    toggle: toggleView,
  }));

  return (
    <>
      <TouchableOpacity
        onPress={() => toggleView(!toggle)}
        style={styles.container}>
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
      {toggle && <View style={styles.childrenContainer}>{children}</View>}
    </>
  );
});

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
  childrenContainer: {
    paddingVertical: 10,
  },
});

export default AppToggle;
