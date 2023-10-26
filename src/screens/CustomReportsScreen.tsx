import {Observer} from 'mobx-react-lite';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CustomReportsStackRootParamList} from '../navigation/CustomReportsStack';
import AppStrings from '../utils/AppStrings';

import {AppContainer, Header, HomeCard} from '../components';
import {authStore} from '../stores';
import {styles} from '../styles/formStyles';
import Utility from '../utils/Utility';

const CustomReportsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<CustomReportsStackRootParamList>>();
  Utility.logData(authStore.userData);

  const navigateToCard = (index: number) => {
    switch (index) {
      case 0:
        navigation.navigate('Reports', {
          data: AppStrings.CUSTOM_REPORTS_CARDS.historicalData,
          id: 'historical_data_report',
        });
        break;
      case 1:
        navigation.navigate('Reports', {
          data: AppStrings.CUSTOM_REPORTS_CARDS.malnutritionReport,
          id: 'recovered_from_malnutrition_report',
        });
        break;
      case 2:
        navigation.navigate('Reports', {
          data: AppStrings.CUSTOM_REPORTS_CARDS.vitaminAReport,
          id: 'received_vitamin_a_report',
        });
        break;
      case 3:
        navigation.navigate('Reports', {
          data: AppStrings.CUSTOM_REPORTS_CARDS.dewormingReport,
          id: 'received_deworming_report',
        });
        break;
      case 4:
        navigation.navigate('Reports', {
          data: AppStrings.CUSTOM_REPORTS_CARDS.ifaReport,
          id: 'received_ifa_report',
        });
        break;
      case 5:
        navigation.navigate('Reports', {
          data: AppStrings.CUSTOM_REPORTS_CARDS.mealsReport,
          id: 'meals_report',
        });
        break;
    }
  };

  return (
    <Observer>
      {() => (
        <>
          <AppContainer>
            <Header title={AppStrings.generateReportLabel} />
            <KeyboardAvoidingView
              behavior={Platform.select({ios: 'padding'})}
              style={styles.keyboardAwoidStyle}>
              <View style={styles.backgroundStyle}>
                <ScrollView
                  contentContainerStyle={styles.contentContainerStyle}>
                  <Pressable>
                    <View style={styles.container}>
                      <Text style={styles.headingText}>
                        {AppStrings.customReports}
                      </Text>
                      <View style={styles.cardsContainer}>
                        {Utility.customReportsCards.map((data, index) => {
                          return (
                            <HomeCard
                              title={data.title}
                              icon={data.icon}
                              key={data.title}
                              onPress={() => navigateToCard(index)}
                              marginRight={index === 0 ? 10 : 0}
                            />
                          );
                        })}
                      </View>
                    </View>
                  </Pressable>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </AppContainer>
        </>
      )}
    </Observer>
  );
};

export default CustomReportsScreen;
