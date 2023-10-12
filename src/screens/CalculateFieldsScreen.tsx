import {Observer} from 'mobx-react-lite';
import BottomSheet from '@gorhom/bottom-sheet/';
import React, {useRef} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  AppContainer,
  AppTextInput,
  AppButton,
  AppBottomSheet,
  Header,
  AppBottomCell,
} from '../components';
import {AppSVGs} from '../assets';
import {useCalculateStore} from '../stores';
import Utility from '../utils/Utility';
import AppStrings from '../utils/AppStrings';
import {styles} from '../styles/formStyles';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {CalculateScreenRouteProp} from '../navigation/ReportsStack';
import {useRoute} from '@react-navigation/native';
type Props = {};

const CalculateFieldsScreen = ({}: Props) => {
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const calStore = useCalculateStore();

  const route = useRoute<CalculateScreenRouteProp>();
  const {from} = route.params;

  const toogleDatePicker = () => {
    calStore.toogleCalender();
  };

  const handleConfirm = (date: Date) => {
    calStore.setDOB(Utility.formatDate(date));
    calStore.toogleCalender();
  };

  return (
    <Observer>
      {() => (
        <>
          <AppContainer>
            <Header title={AppStrings.healthCampLabel} />
            <KeyboardAvoidingView
              behavior={Platform.select({ios: 'padding'})}
              style={styles.keyboardAwoidStyle}>
              <View style={styles.backgroundStyle}>
                <ScrollView
                  contentContainerStyle={styles.contentContainerStyle}>
                  <View style={styles.container}>
                    <Text style={styles.headingText}>
                      {from === AppStrings.fromDoctor
                        ? AppStrings.doctorsObservation
                        : AppStrings.calculatedValues}
                    </Text>
                    <AppTextInput
                      value={calStore.childName}
                      parentStyle={styles.textInputStyle}
                      textHeader={AppStrings.childName}
                      placeHolder={AppStrings.childNamePlaceHolder}
                      onChangeText={calStore.setChildame}
                    />

                    <AppTextInput
                      parentStyle={styles.dovInputStyle}
                      textHeader={AppStrings.HEALTH_CAMP_SCREEN.dob}
                      rightIcon={AppSVGs.dob}
                      placeHolder={AppStrings.HEALTH_CAMP_SCREEN.dob}
                      hideInput={true}
                      onPress={toogleDatePicker}
                      otherText={calStore.dob}
                    />

                    <AppTextInput
                      value={calStore.contact}
                      parentStyle={styles.textInputStyle}
                      textHeader={AppStrings.contact}
                      placeHolder={AppStrings.HEALTH_CAMP_SCREEN.contactNumber}
                      onChangeText={calStore.setContact}
                      keyboardType="numeric"
                      maxLength={10}
                    />
                  </View>
                </ScrollView>
                <AppButton
                  title={AppStrings.submit}
                  style={styles.buttonStyle}
                  width={'90%'}
                  isLoading={calStore.isLoading}
                  onPress={() => calStore.handleSubmit(from)}
                  enabled={calStore.enableSubmit}
                />
              </View>
            </KeyboardAvoidingView>
          </AppContainer>
          <DateTimePickerModal
            isVisible={calStore.showCalender}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={toogleDatePicker}
            maximumDate={new Date()}
          />

          <AppBottomSheet
            isVisible={calStore.openBottomSheet}
            onClose={calStore.toggleBottomSheet}
            index={3}
            ref={bottomSheetRef}>
            <AppBottomCell
              header={calStore.bottomSheetHeader}
              data={calStore.bottomSheetArray}
              onClose={() => {
                bottomSheetRef?.current?.close();
                calStore.toggleBottomSheet();
              }}
              onItemSelect={calStore.setValue}
              onPress={calStore.toggleBottomSheet}
            />
          </AppBottomSheet>
        </>
      )}
    </Observer>
  );
};

export default CalculateFieldsScreen;
