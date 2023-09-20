import {useRoute} from '@react-navigation/native';
import {Observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AppContainer, AppTextContent, Header} from '../components';
import {TargetScreenRouteProp} from '../navigation/ReportsStack';
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
          <Header title={'Health Camp'} />
          <KeyboardAvoidingView
            behavior={Platform.select({ios: 'padding'})}
            style={styles.keyboardAwoidStyle}>
            <View style={styles.backgroundStyle}>
              <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                <View style={styles.container}>
                  <Text style={styles.headingText}>
                    Calculated Field Values
                  </Text>
                  <AppTextContent
                    textHeader="Received Vitamin A Dose?"
                    textContent={genStore.vitaminA}
                  />
                  <AppTextContent
                    textHeader="Received De-worming Dose?"
                    textContent={genStore.deworm}
                  />
                  <AppTextContent
                    textHeader="Received IFA Dose?"
                    textContent={genStore.ifa}
                  />
                  <AppTextContent
                    textHeader="Age in Months"
                    textContent={genStore.age}
                  />
                  <AppTextContent textHeader="BMI" textContent={genStore.bmi} />

                  <AppTextContent
                    textHeader="Weight Development"
                    textContent={genStore.weightDev}
                  />

                  <AppTextContent
                    textHeader="Height development / Stunting"
                    textContent={genStore.heightDev}
                  />

                  <AppTextContent
                    textHeader="Overall Development / Malnutrition Grades"
                    textContent={genStore.overAllDev}
                  />

                  <AppTextContent
                    textHeader="Weight Gain"
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
