import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Header from '../components/common/Header';
import {RouteProp, useRoute} from '@react-navigation/native';
import {DashboardStackRootParamList} from '../navigation/DashboardStack';
import {AppButton, AppTextInput} from '../components';
import {AppSVGs} from '../assets';
import DatePicker from 'react-native-date-picker';
import Utility from '../utils/Utility';
import AppRadioInput from '../components/common/AppRadioInput';
import {colors} from '../theme';
import AppImageUploadInput from '../components/common/AppImageUploadInput';
// import AppDropdownInput from '../components/common/AppDropdownInput';

type Props = {};

type RouteParams = RouteProp<DashboardStackRootParamList, 'CaptureDetails'>;

const CaptureDetailsScreen = ({}: Props) => {
  const route = useRoute<RouteParams>();
  const [dob, setDOB] = useState<string | undefined>(undefined);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const {title} = route?.params;

  const onDOBPress = () => {
    setOpenDatePicker(true);
  };

  const onConfirmDate = (date: Date) => {
    setDOB(Utility.formatDate(date));
    setOpenDatePicker(false);
  };

  const onCancelDate = () => {
    setOpenDatePicker(false);
  };

  const options = [
    {
      label: 'Male',
      value: 'male',
      iconUri: AppSVGs.male,
    },
    {
      label: 'Female',
      value: 'female',
      iconUri: AppSVGs.female,
    },
    {
      label: 'Other',
      value: 'other',
      iconUri: AppSVGs.female,
    },
  ];

  const handleOptionSelect = (selectedValue: string) => {
    console.log('Selected:', selectedValue);
  };

  // const [selectedValue, setSelectedValue] = useState('Option 1');
  // console.log(selectedValue, 'selected value');
  // const options2 = ['Option 1', 'Option 2', 'Option 3'];

  // const handleSelect = option => {
  //   setSelectedValue(option);
  // };

  return (
    <SafeAreaView style={styles.containerWidth}>
      <Header title={title} />
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding'})}
        style={styles.containerWidth}>
        <View style={styles.backgroundStyle}>
          <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.container}>
              <AppTextInput
                parentStyle={styles.textInputStyle}
                textHeader="PARTNER NAME"
                placeHolder="Partner name"
              />
              <AppTextInput
                parentStyle={styles.textInputStyle}
                textHeader="CENTER NAME"
                placeHolder="Center name"
              />
              <AppTextInput
                parentStyle={styles.textInputStyle}
                textHeader="CHILD'S NAME"
                placeHolder="Name"
              />
              <AppTextInput
                parentStyle={styles.dobInputStyle}
                textHeader="DATE OF BIRTH"
                rightIcon={AppSVGs.dob}
                placeHolder="Date Of Birth"
                hideInput={true}
                onPress={onDOBPress}
                otherText={dob}
              />
              <AppTextInput
                parentStyle={styles.textInputStyle}
                textHeader="CONTACT NAME"
                placeHolder="+91 123456789"
                keyboardType="numeric"
              />
              {/* <AppDropdownInput
              selectedValue={selectedValue}
              options={options2}
              onSelect={handleSelect}
            /> */}
              <AppRadioInput options={options} onSelect={handleOptionSelect} />
              <AppImageUploadInput />
              <AppTextInput
                parentStyle={styles.textInputStyle}
                textHeader="LOCATION"
                placeHolder="location"
              />
              <AppTextInput
                parentStyle={styles.textInputStyle}
                textHeader="HEIGHT"
                placeHolder="Enter Height"
                keyboardType="numeric"
              />
              <AppTextInput
                parentStyle={styles.textInputStyle}
                textHeader="WEIGHT"
                placeHolder="Enter Weight"
                keyboardType="numeric"
              />
              <AppTextInput
                parentStyle={styles.textInputStyle}
                textHeader="TARGET BENEFICIARY"
                placeHolder="Target Beneficiary"
              />
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
      <DatePicker
        modal
        date={new Date()}
        open={openDatePicker}
        mode="date"
        onConfirm={onConfirmDate}
        onCancel={onCancelDate}
      />
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
  dobInputStyle: {
    backgroundColor: '#F7F7F7',
    borderColor: colors.gray,
    borderWidth: 1,
    paddingRight: 30,
    borderRadius: 25,
  },
});
