import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Header from '../components/common/Header';
import {RouteProp, useRoute} from '@react-navigation/native';
import {DashboardStackRootParamList} from '../navigation/DashboardStack';

type Props = {};

type RouteParams = RouteProp<DashboardStackRootParamList, 'GenerateReports'>;

const GenerateReportsScreen = ({}: Props) => {
  const route = useRoute<RouteParams>();
  const {title} = route?.params;
  return (
    <SafeAreaView>
      <Header title={title} />
      <View>
        <Text>Generate Reports screens</Text>
      </View>
    </SafeAreaView>
  );
};

export default GenerateReportsScreen;
