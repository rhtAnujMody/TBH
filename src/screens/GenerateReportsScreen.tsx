import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Header from '../components/common/Header';

type Props = {};

const GenerateReportsScreen = ({}: Props) => {
  return (
    <SafeAreaView>
      <Header title="Generate Reports" />
      <View>
        <Text>Generate Reports screens</Text>
      </View>
    </SafeAreaView>
  );
};

export default GenerateReportsScreen;
