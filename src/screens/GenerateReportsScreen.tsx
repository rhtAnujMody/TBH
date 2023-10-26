import {useRoute} from '@react-navigation/native';
import {Observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {AppContainer, AppTextContent, Header} from '../components';
import {TargetScreenRouteProp} from '../navigation/ReportsStack';
import AppStrings from '../utils/AppStrings';
import {useGenerateStore} from '../stores';
import {styles} from '../styles/formStyles';
type Props = {};

const GenerateReportsScreen = ({}: Props) => {
  const genStore = useGenerateStore();
  const route = useRoute<TargetScreenRouteProp>();
  const {id} = route.params;
  useEffect(() => {
    genStore.handleSubmit(id);
  }, []);
  return (
    <Observer>
      {() => (
        <AppContainer>
          <Header title={AppStrings.healthCampLabel} />
          <KeyboardAvoidingView
            behavior={Platform.select({ios: 'padding'})}
            style={styles.keyboardAwoidStyle}>
            <View style={styles.backgroundStyle}>
              <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                <View style={styles.container}>
                  <Text style={styles.headingText}>
                    {AppStrings.calculatedValues}
                  </Text>
                  <AppTextContent
                    textHeader={AppStrings.receivedVitaminA}
                    textContent={genStore.vitaminA}
                  />
                  <AppTextContent
                    textHeader={AppStrings.receivedDeworming}
                    textContent={genStore.deworm}
                  />
                  <AppTextContent
                    textHeader={AppStrings.receivedIFA}
                    textContent={genStore.ifa}
                  />
                  <AppTextContent
                    textHeader={AppStrings.ageMonths}
                    textContent={genStore.age}
                  />
                  <AppTextContent
                    textHeader={AppStrings.bmi}
                    textContent={genStore.bmi}
                  />

                  <AppTextContent
                    textHeader={AppStrings.weightDevelopment}
                    textContent={genStore.weightDev}
                  />

                  <AppTextContent
                    textHeader={AppStrings.heightDevelopment}
                    textContent={genStore.heightDev}
                  />

                  <AppTextContent
                    textHeader={AppStrings.overallDevelopment}
                    textContent={genStore.overAllDev}
                  />

                  <AppTextContent
                    textHeader={AppStrings.weightGain}
                    textContent={genStore.weightGain}
                  />
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </AppContainer>
      )}
    </Observer>
  );
};

export default GenerateReportsScreen;
