import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {AppSVGs} from '../assets';
import {AppContainer, HomeCard, ObservableChild} from '../components';
import {DashboardStackProps} from '../navigation/AppNavigation';
import {authStore} from '../stores';
import {colors, typography} from '../theme';
import AppStrings from '../utils/AppStrings';

const Dashboard = () => {
  const navigation = useNavigation<DashboardStackProps>();

  const homeCards = [
    {
      title: AppStrings.HOME_CARDS.dataCapture,
      icon: AppSVGs.capture_details,
    },
    {
      title: AppStrings.HOME_CARDS.calculatedFieldValues,
      icon: AppSVGs.report,
    },
    {
      title: AppStrings.HOME_CARDS.observationEntry,
      icon: AppSVGs.report,
    },
  ];

  const genrateReportsCards = [
    {
      title: AppStrings.GENERATE_REPORT_CARDS.malnutrition,
      icon: AppSVGs.report,
    },
    {
      title: AppStrings.GENERATE_REPORT_CARDS.wasting,
      icon: AppSVGs.report,
    },
    {
      title: AppStrings.GENERATE_REPORT_CARDS.stunting,
      icon: AppSVGs.report,
    },
    {
      title: AppStrings.GENERATE_REPORT_CARDS.custom,
      icon: AppSVGs.report,
    },
    {
      title: AppStrings.GENERATE_REPORT_CARDS.doctorsObservation,
      icon: AppSVGs.report,
    },
    {
      title: AppStrings.GENERATE_REPORT_CARDS.nutritionEducation,
      icon: AppSVGs.report,
    },
    {
      title: AppStrings.GENERATE_REPORT_CARDS.monitoring,
      icon: AppSVGs.report,
    },
  ];

  const adminManage = [
    {
      title: AppStrings.ADMIN_MANAGE.manageUsers,
      icon: AppSVGs.user,
    },
    {
      title: AppStrings.ADMIN_MANAGE.managePartners,
      icon: AppSVGs.user,
    },
    {
      title: AppStrings.ADMIN_MANAGE.manageChildren,
      icon: AppSVGs.user,
    },
  ];

  const navigateToCard = (index: number) => {
    switch (index) {
      case 0:
        navigation.navigate('HealthCamp');
        break;
      case 1:
        navigation.navigate('ReportsStack', {
          screen: 'Calculate',
          params: {from: AppStrings.fromCalculate},
        });
        break;
      case 2:
        navigation.navigate('DoctorStack', {
          screen: 'Calculate',
          params: {from: AppStrings.fromDoctor},
        });
        break;
      case 3:
        navigation.navigate('CaptureDetails');
        break;
      case 4:
        navigation.navigate('ProgramMonitor');
        break;
      case 5:
        navigation.navigate('Reports', {
          data: AppStrings.GENERATE_REPORT_CARDS.malnutrition,
          id: 'malnutrition_report',
        });
        break;
      case 6:
        navigation.navigate('Reports', {
          data: AppStrings.GENERATE_REPORT_CARDS.wasting,
          id: 'wasting_report',
        });
        break;
      case 7:
        navigation.navigate('Reports', {
          data: AppStrings.GENERATE_REPORT_CARDS.stunting,
          id: 'stunting_report',
        });
        break;
      case 8:
        navigation.navigate('CustomStack', {
          screen: 'Custom',
        });
        break;
      case 9:
        navigation.navigate('Reports', {
          data: AppStrings.GENERATE_REPORT_CARDS.doctorsObservation,
          id: 'doctor_observation_report',
        });
        break;
      case 10:
        navigation.navigate('Reports', {
          data: AppStrings.GENERATE_REPORT_CARDS.nutritionEducation,
          id: 'nutrition_education_report',
        });
        break;
      case 11:
        navigation.navigate('Reports', {
          data: AppStrings.GENERATE_REPORT_CARDS.monitoring,
          id: 'monitoring_report',
        });
        break;
      case 12:
        navigation.navigate('ManageUsers', {
          id: 1,
        });
        break;
      case 13:
        navigation.navigate('ManageUsers', {
          id: 2,
        });
        break;
      case 14:
        navigation.navigate('ManageUsers', {
          id: 3,
        });
        break;
    }
  };
  const auth = authStore;

  return (
    <AppContainer style={styles.container}>
      <View style={styles.topContainer}>
        <AppSVGs.tbrlogo height={100} width={110} style={styles.logo} />
        <Text style={styles.loginText} onPress={auth.logout}>
          {AppStrings.logout}
        </Text>
        <View style={styles.profileContainer}>
          <AppSVGs.profile style={styles.userLogo} />
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcome}>{AppStrings.welcome},</Text>
            <ObservableChild>
              <Text style={styles.userName}>{authStore.userData.name}</Text>
            </ObservableChild>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView contentContainerStyle={styles.bodyScroll}>
          <Pressable>
            <Text style={styles.title}>{AppStrings.healthCampLabel}</Text>
            <View style={styles.cardsContainer}>
              {homeCards.map((data, index) => {
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
            <Text style={styles.title}>
              {AppStrings.nutritionEducationLabel}
            </Text>
            <View style={styles.cardsContainer}>
              <HomeCard
                title={homeCards[0].title}
                icon={homeCards[0].icon}
                key={homeCards[0].title}
                onPress={() => navigateToCard(3)}
              />
            </View>
            <Text style={styles.title}>
              {AppStrings.programMonitoringLabel}
            </Text>
            <View style={styles.cardsContainer}>
              <HomeCard
                title={homeCards[0].title}
                icon={homeCards[0].icon}
                key={homeCards[0].title}
                onPress={() => navigateToCard(4)}
              />
            </View>

            <Text style={styles.title}>{AppStrings.generateReportLabel}</Text>
            {auth.userData.role === 'A' ? (
              <>
                <View style={styles.cardsContainer}>
                  {genrateReportsCards.map((data, index) => {
                    return (
                      <HomeCard
                        title={data.title}
                        icon={data.icon}
                        key={data.title}
                        onPress={() => navigateToCard(index + 5)}
                        marginRight={index === 0 ? 10 : 0}
                      />
                    );
                  })}
                </View>
                <Text style={styles.title}>{AppStrings.manageUsersLabel}</Text>
                <View style={styles.cardsContainer}>
                  {adminManage.map((data, index) => {
                    return (
                      <HomeCard
                        title={data.title}
                        icon={data.icon}
                        key={data.title}
                        onPress={() => navigateToCard(index + 12)}
                        marginRight={index === 0 ? 10 : 0}
                      />
                    );
                  })}
                </View>
              </>
            ) : (
              <View style={styles.cardsContainer}>
                <HomeCard
                  title={genrateReportsCards[4].title}
                  icon={genrateReportsCards[4].icon}
                  key={genrateReportsCards[4].title}
                  onPress={() => navigateToCard(9)}
                />
              </View>
            )}
          </Pressable>
        </ScrollView>
      </View>
      <AppSVGs.buildings style={styles.buildingLogo} />
    </AppContainer>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    alignSelf: 'center',
    marginTop: -10,
  },
  topContainer: {
    flex: 0.8,
    backgroundColor: colors.palette.primary,
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
    overflow: 'hidden',
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -40,
    marginHorizontal: 30,
  },
  userLogo: {
    transform: [{scale: 1.3}],
  },
  welcomeContainer: {
    marginLeft: 15,
  },
  welcome: {
    ...typography.bold(24, colors.black),
  },
  userName: {
    ...typography.regular,
  },
  bottomContainer: {
    flex: 2,
  },
  cardsContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    zIndex: 100,
  },
  buildingLogo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -2,
  },
  title: {
    ...typography.bold(18),
    marginLeft: 20,
    marginTop: 10,
  },
  loginText: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 20,
    zIndex: 10,
  },
  bodyScroll: {flexGrow: 1},
});
