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
import {AppContainer, AppTextContent} from '../components';
import Header from '../components/common/Header';
import {TargetScreenRouteProp} from '../navigation/ReportsStack';
import useGenerateStore from '../stores/useGenerateStore';
import {colors, typography} from '../theme';
import AppStrings from '../utils/AppStrings';
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
            style={styles.keyboardAvoidingViewStyle}>
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
    backgroundColor: colors.palette.primary,
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
