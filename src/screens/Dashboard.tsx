import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppSVGs} from '../assets';
import {HomeCard} from '../components';
import {useNavigation} from '@react-navigation/native';
import {DashboardStackProps} from '../navigation/AppNavigation';
import AppContainer from '../components/common/AppContainer';
import ObservableChild from '../components/common/ObservableChild';
import {authStore} from '../stores';
import {colors, typography} from '../theme';
import Utility from '../utils/Utility';

const Dashboard = () => {
  const navigation = useNavigation<DashboardStackProps>();
  const homeCards = [
    {
      title: 'Capture Details',
      icon: AppSVGs.capture_details,
    },
    {
      title: 'Generate Reports',
      icon: AppSVGs.report,
    },
  ];

  const navigateToCard = (index: number) => {
    if (index === 0) {
      navigation.navigate('CaptureDetails');
    } else if (index === 1) {
      navigation.navigate('GenerateReports');
    }
  };
  const auth = authStore;

  return (
    <AppContainer style={styles.container}>
      <View style={styles.topContainer}>
        <AppSVGs.logo style={styles.logo} />
        <Text
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            padding: 20,
            zIndex: 10,
          }}
          onPress={auth.logout}>
          Logout
        </Text>
        <View style={styles.profileContainer}>
          <AppSVGs.profile style={styles.userLogo} />
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcome}>Welcome,</Text>
            <ObservableChild>
              <Text style={styles.userName}>{auth.userData.name}</Text>
            </ObservableChild>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.cardsContainer}>
          {homeCards.map((data, index) => {
            return (
              <HomeCard
                title={data.title}
                icon={data.icon}
                key={data.title}
                marginRight={index === 0 ? 10 : 0}
                onPress={() => {
                  navigateToCard(index);
                }}
              />
            );
          })}
        </View>
        <AppSVGs.buildings style={styles.buildingLogo} />
      </View>
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
    flex: 1.6,
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
    marginTop: 40,
    flexDirection: 'row',
  },
  buildingLogo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
