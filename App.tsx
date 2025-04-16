/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <AppNavigation />
    </SafeAreaView>
  );
}

export default App;
