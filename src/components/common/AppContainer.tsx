import React from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  children: React.ReactNode;
  style: ViewStyle;
};

const AppContainer = ({children, style}: Props) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <SafeAreaView style={[styles.container, style]}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>{children}</View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AppContainer;

const styles = StyleSheet.create({
  container: {flex: 1},
});
