import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {AppSVGs} from '../assets';
import {HomeCard} from '../components';
import AppContainer from '../components/common/AppContainer';
import ObservableChild from '../components/common/ObservableChild';
import {DashboardStackProps} from '../navigation/AppNavigation';
import {authStore} from '../stores';
import {colors, typography} from '../theme';
import Utility from '../utils/Utility';
import AppStrings from '../utils/AppStrings';

const Dashboard = () => {
  const navigation = useNavigation<DashboardStackProps>();

  const homeCards = [
    {
      title: 'Proceed For Data Capture',
      icon: AppSVGs.capture_details,
    },
    {
      title: 'View Calculated Field Values',
      icon: AppSVGs.report,
    },
    {
      title: "Doctor's Observation Entry",
      icon: AppSVGs.report,
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
        navigation.navigate('ReportsStack', {
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
    }
  };
  const auth = authStore;

  return (
    <AppContainer style={styles.container}>
      <View style={styles.topContainer}>
        <AppSVGs.logo style={styles.logo} />
        <Text style={styles.loginText} onPress={auth.logout}>
          Logout
        </Text>
        <View style={styles.profileContainer}>
          <AppSVGs.profile style={styles.userLogo} />
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcome}>Welcome,</Text>
            <ObservableChild>
              <Text style={styles.userName}>{authStore.userData.name}</Text>
            </ObservableChild>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView contentContainerStyle={styles.bodyScroll}>
          <Text style={styles.title}>Health Camp</Text>
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
          <Text style={styles.title}>Nutrition Education</Text>
          <View style={styles.cardsContainer}>
            <HomeCard
              title={homeCards[0].title}
              icon={homeCards[0].icon}
              key={homeCards[0].title}
              onPress={() => navigateToCard(3)}
            />
          </View>
          <Text style={styles.title}>Program Monitoring</Text>
          <View style={styles.cardsContainer}>
            <HomeCard
              title={homeCards[0].title}
              icon={homeCards[0].icon}
              key={homeCards[0].title}
              onPress={() => navigateToCard(4)}
            />
          </View>
          <Text style={styles.title}>Generate Report</Text>
          <View style={styles.cardsContainer}>
            <HomeCard
              title={'Malnutrition Report'}
              icon={homeCards[0].icon}
              key={homeCards[0].title}
              onPress={() => navigateToCard(4)}
            />
          </View>
          <View style={styles.cardsContainer}>
            <HomeCard
              title={'Wasting-Stunting Report'}
              icon={homeCards[0].icon}
              key={homeCards[0].title}
              onPress={() => navigateToCard(5)}
            />
          </View>
          <View style={styles.cardsContainer}>
            <HomeCard
              title={'Custom Report'}
              icon={homeCards[0].icon}
              key={homeCards[0].title}
              onPress={() => navigateToCard(6)}
            />
          </View>
          <View style={styles.cardsContainer}>
            <HomeCard
              title={"Doctor's Observation Report"}
              icon={homeCards[0].icon}
              key={homeCards[0].title}
              onPress={() => navigateToCard(7)}
            />
          </View>
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
    transform: [{scale: 0.6}],
    alignSelf: 'center',
    marginTop: 5,
  },
  topContainer: {
    flex: 1.3,
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
