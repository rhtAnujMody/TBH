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
import {AppContainer, AppTextInput, AppTextContent} from '../components';
import Header from '../components/common/Header';
import {colors, typography} from '../theme';
import useGenerateStore from '../stores/useGenerateStore';
import {useRoute} from '@react-navigation/native';
import {TargetScreenRouteProp} from '../navigation/ReportsStack';
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
            style={{flex: 1, backgroundColor: colors.palette.primary}}>
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
});
