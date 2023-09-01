import {Observer} from 'mobx-react-lite';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppSVGs} from '../assets';
import {AppContainer, AppTextInput} from '../components';
import Header from '../components/common/Header';
import {colors, typography} from '../theme';
type Props = {};

const GenerateReportsScreen = ({}: Props) => {
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
                  <AppTextInput
                    parentStyle={styles.textInputStyle}
                    textHeader="Received Vitamin A Dose?"
                    placeHolder=""
                    value={'Yes'}
                    editable={false}
                  />
                  <AppTextInput
                    parentStyle={styles.textInputStyle}
                    textHeader="Received De-worming Dose?"
                    placeHolder=""
                    value={'Yes'}
                    editable={false}
                  />
                  <AppTextInput
                    parentStyle={styles.textInputStyle}
                    textHeader="Received IFA Dose?"
                    placeHolder=""
                    value={'Yes'}
                    editable={false}
                  />
                  <AppTextInput
                    parentStyle={styles.textInputStyle}
                    textHeader="Age in Months"
                    placeHolder=""
                    value={'28'}
                    editable={false}
                  />
                  <AppTextInput
                    parentStyle={styles.textInputStyle}
                    textHeader="BMI"
                    placeHolder=""
                    value={'24'}
                    editable={false}
                  />
                  <AppTextInput
                    parentStyle={styles.textInputStyle}
                    textHeader="Weight Development"
                    placeHolder=""
                    value={'24'}
                    editable={false}
                  />
                  <AppTextInput
                    parentStyle={styles.textInputStyle}
                    textHeader="Height development / Stunting"
                    placeHolder=""
                    value={'24'}
                    editable={false}
                  />
                  <AppTextInput
                    parentStyle={styles.textInputStyle}
                    textHeader="Overall Development / Malnutrition Grades"
                    placeHolder=""
                    value={'24'}
                    editable={false}
                  />
                  <AppTextInput
                    parentStyle={styles.textInputStyle}
                    textHeader="Weight Gain"
                    placeHolder=""
                    value={'24'}
                    editable={false}
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
