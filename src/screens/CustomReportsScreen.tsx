import {Observer} from 'mobx-react-lite';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {AppContainer} from '../components';
import Header from '../components/common/Header';
import {authStore} from '../stores';
import {colors, typography} from '../theme';
import Utility from '../utils/Utility';
import {HomeCard} from '../components';
import {AppSVGs} from '../assets';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CustomReportsStackRootParamList} from '../navigation/CustomReportsStack';
const CustomReportsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<CustomReportsStackRootParamList>>();
  Utility.logData(authStore.userData);

  const customReportsCards = [
    {
      title: 'Historical Data Report',
      icon: AppSVGs.report,
    },
    {
      title: 'Recovered From Malnutrition Report',
      icon: AppSVGs.report,
    },
    {
      title: 'Received Vitamin A Report',
      icon: AppSVGs.report,
    },
    {
      title: 'Received Deworming Report',
      icon: AppSVGs.report,
    },
    {
      title: 'Received IFA Report',
      icon: AppSVGs.report,
    },
    {
      title: 'Meals Received for Program Monitoring Report',
      icon: AppSVGs.report,
    },
  ];

  const navigateToCard = (index: number) => {
    switch (index) {
      case 0:
        navigation.navigate('Reports', {
          data: 'Historical Data Report',
          id: 'historical_data_report',
        });
        break;
      case 1:
        navigation.navigate('Reports', {
          data: 'Recovered From Malnutrition Report',
          id: 'recovered_from_malnutrition_report',
        });
        break;
      case 2:
        navigation.navigate('Reports', {
          data: 'Received Vitamin A Report',
          id: 'received_vitamin_a_report',
        });
        break;
      case 3:
        navigation.navigate('Reports', {
          data: 'Received Deworming Report',
          id: 'received_deworming_report',
        });
        break;
      case 4:
        navigation.navigate('Reports', {
          data: 'Received IFA Report',
          id: 'received_ifa_report',
        });
        break;
      case 5:
        navigation.navigate('Reports', {
          data: 'Meals Received for Program Monitoring Report',
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
            <Header title={'Generate Report'} />
            <KeyboardAvoidingView
              behavior={Platform.select({ios: 'padding'})}
              style={styles.keyboardAwaidStyle}>
              <View style={styles.backgroundStyle}>
                <ScrollView
                  contentContainerStyle={styles.contentContainerStyle}>
                  <Pressable>
                    <View style={styles.container}>
                      <Text style={styles.headingText}>Custom Reports</Text>
                      <View style={styles.cardsContainer}>
                        {customReportsCards.map((data, index) => {
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  contentContainerStyle: {
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    //backgroundColor: '#FCFCFC',
  },
  containerWidth: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundStyle: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textInputStyle: {
    backgroundColor: '#F7F7F7',
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 25,
  },
  buttonStyle: {
    marginBottom: 10,
  },
  dovInputStyle: {
    backgroundColor: '#F7F7F7',
    borderColor: colors.gray,
    borderWidth: 1,
    paddingRight: 30,
    borderRadius: 25,
  },
  photoContainerStyle: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 16,
  },
  headerStyle: {
    fontWeight: 'bold',
  },
  headingText: {
    ...typography.bold(16),
    marginBottom: 20,
  },
  hourContainer: {
    flexDirection: 'row',
  },
  cardsContainer: {
    //marginHorizontal: 10,
    marginTop: 10,
    zIndex: 100,
  },
  hourMinute: {flex: 1, paddingRight: 10},
  keyboardAwaidStyle: {flex: 1, backgroundColor: colors.palette.primary},
});
