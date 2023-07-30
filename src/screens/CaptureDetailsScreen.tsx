import {Observer} from 'mobx-react-lite';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {AppSVGs} from '../assets';
import {AppButton, AppTextInput} from '../components';
import AppImageUploadInput from '../components/common/AppImageUploadInput';
import Header from '../components/common/Header';
import useCaptureDetailsStore from '../stores/useCaptureDetailsStore';
import {colors} from '../theme';
import Utility from '../utils/Utility';

const CaptureDetailsScreen = () => {
  const cdStore = useCaptureDetailsStore();

  const onDOVPress = () => {
    cdStore.toggleDOVPicker();
  };

  const onConfirmDate = (date: Date) => {
    cdStore.setDOV(Utility.formatDate(date));
    cdStore.toggleDOVPicker();
  };

  const onCancelDate = () => {
    cdStore.toggleDOVPicker();
  };

  // const [selectedValue, setSelectedValue] = useState('Option 1');
  // console.log(selectedValue, 'selected value');
  // const options2 = ['Option 1', 'Option 2', 'Option 3'];

  // const handleSelect = option => {
  //   setSelectedValue(option);
  // };

  return (
    <SafeAreaView style={styles.containerWidth}>
      <Header title={'Capture Details'} />
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding'})}
        style={styles.containerWidth}>
        <View style={styles.backgroundStyle}>
          <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.container}>
              <Observer>
                {() => (
                  <AppTextInput
                    parentStyle={styles.dovInputStyle}
                    textHeader="DATE OF VISIT"
                    rightIcon={AppSVGs.dob}
                    placeHolder="Date Of Visit"
                    hideInput={true}
                    onPress={onDOVPress}
                    otherText={cdStore.dov}
                  />
                )}
              </Observer>
              <AppTextInput
                parentStyle={styles.textInputStyle}
                textHeader="TOTAl NUMBER OF PARTICIPANTS"
                placeHolder="Total number of participants"
                onChangeText={cdStore.setTotalNoOfParticipants}
              />
              <AppTextInput
                parentStyle={styles.textInputStyle}
                textHeader="METHOD USED"
                placeHolder="Method used"
                onChangeText={cdStore.setMethodUsed}
              />
              <AppTextInput
                parentStyle={styles.textInputStyle}
                textHeader="TOPICS COVERED"
                placeHolder="Topics covered"
                onChangeText={cdStore.setTopicsCovered}
              />
              <AppTextInput
                parentStyle={styles.textInputStyle}
                textHeader="SESSION CONDUCTED BY"
                placeHolder="Session conducted by"
                onChangeText={cdStore.setSessionCoveredBy}
              />
              {/* <AppDropdownInput
              selectedValue={selectedValue}
              options={options2}
              onSelect={handleSelect}
            /> */}
              <AppTextInput
                parentStyle={styles.textInputStyle}
                textHeader="FEEDBACK FROM PARTICIPANTS"
                placeHolder="Feedback from participants"
                onChangeText={cdStore.setFeedbackFromParticipants}
              />
              <AppImageUploadInput />
              <AppButton
                title="Reset"
                style={styles.buttonStyle}
                // isLoading={loginStore.isLoading}
                onPress={() => console.log('click')}
                // enabled={loginStore.isButtonEnabled}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      <Observer>
        {() => (
          <DatePicker
            modal
            date={new Date()}
            open={cdStore.openDOVPicker}
            mode="date"
            onConfirm={onConfirmDate}
            onCancel={onCancelDate}
          />
        )}
      </Observer>
    </SafeAreaView>
  );
};

export default CaptureDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainerStyle: {
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FCFCFC',
  },
  containerWidth: {
    flex: 1,
  },
  backgroundStyle: {
    backgroundColor: colors.palette.primary,
  },
  textInputStyle: {
    backgroundColor: '#F7F7F7',
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 25,
  },
  buttonStyle: {
    marginTop: 10,
  },
  dovInputStyle: {
    backgroundColor: '#F7F7F7',
    borderColor: colors.gray,
    borderWidth: 1,
    paddingRight: 30,
    borderRadius: 25,
  },
});
