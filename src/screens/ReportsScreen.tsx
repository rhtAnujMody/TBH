import BottomSheet from '@gorhom/bottom-sheet/';
import {Observer} from 'mobx-react-lite';
import React, {useRef} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  AppBottomSheet,
  AppBottomSheetDropdown,
  AppButton,
  AppContainer,
  AppTextInput,
  AppInput,
  Header,
} from '../components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {RouteProp, useRoute} from '@react-navigation/native';

import {AppSVGs} from '../assets';
import {styles} from '../styles/formStyles';
import {useReportsStore} from '../stores';
import Utility from '../utils/Utility';
import {DashboardStackRootParamList} from '../navigation/DashboardStack';
import AppStrings from '../utils/AppStrings';

const ReportsScreen = () => {
  const reportsStore = useReportsStore();
  const route = useRoute<RouteProp<DashboardStackRootParamList, 'Reports'>>();
  const {data, id} = route.params;
  const bottomSheetRef = useRef<BottomSheet | null>(null);

  const hideBottomSheet = () => {
    reportsStore.toggleBottomSheet();
  };
  const showDatePicker = (id: string) => {
    reportsStore.setCalenderID(id);
    reportsStore.toogleCalender();
  };

  const hideDatePicker = () => {
    reportsStore.toogleCalender();
  };
  const handleBottomSheetClick = () => {
    reportsStore.toggleBottomSheet();
  };
  const handleSubmit = () => {
    reportsStore.saveData(id);
  };

  const handleConfirm = (date: Date) => {
    switch (reportsStore.calenderID) {
      case '1':
        reportsStore.setFromDate(Utility.formatDate(date));
        break;
      case '2':
        reportsStore.setToDate(Utility.formatDate(date));
        break;
    }
    reportsStore.toogleCalender();
  };
  return (
    <Observer>
      {() => (
        <>
          <AppContainer>
            <Header title={AppStrings.generateReportLabel} />
            <KeyboardAvoidingView
              behavior={Platform.select({ios: 'padding'})}
              style={styles.keyboardAwoidStyle}>
              <View style={styles.backgroundStyle}>
                <ScrollView
                  contentContainerStyle={styles.contentContainerStyle}>
                  <Pressable>
                    <View style={styles.container}>
                      <Text style={styles.headingText}>{data}</Text>

                      <AppTextInput
                        parentStyle={styles.dovInputStyle}
                        textHeader={AppStrings.startDate}
                        rightIcon={AppSVGs.dob}
                        placeHolder={AppStrings.startDate}
                        hideInput={true}
                        onPress={() => {
                          showDatePicker('1');
                        }}
                        otherText={reportsStore.fromDate}
                      />
                      <AppTextInput
                        parentStyle={styles.dovInputStyle}
                        textHeader={AppStrings.endDate}
                        rightIcon={AppSVGs.dob}
                        placeHolder={AppStrings.endDate}
                        hideInput={true}
                        onPress={() => {
                          showDatePicker('2');
                        }}
                        otherText={reportsStore.toDate}
                      />
                      <AppInput
                        onPress={() => {
                          handleBottomSheetClick();
                        }}
                        parentStyle={styles.textInputStyle}
                        value={reportsStore.partner}
                        textHeader={AppStrings.partnerNameLocation}
                        placeHolder={AppStrings.partnerNameLocation}
                        rightIcon={AppSVGs.dropdown}
                      />
                    </View>
                  </Pressable>
                </ScrollView>
                <AppButton
                  title={AppStrings.submit}
                  style={styles.buttonStyle}
                  width={'90%'}
                  isLoading={reportsStore.isLoading}
                  onPress={handleSubmit}
                  enabled={reportsStore.enableSubmit}
                />
              </View>
            </KeyboardAvoidingView>
          </AppContainer>
          <AppBottomSheet
            isVisible={reportsStore.openBottomSheet}
            onClose={hideBottomSheet}
            index={reportsStore.index}
            ref={bottomSheetRef}>
            <AppBottomSheetDropdown
              header={reportsStore.bottomSheetHeader}
              data={reportsStore.bottomSheetArray}
              onClose={() => {
                bottomSheetRef?.current?.close();
                reportsStore.toggleBottomSheet();
              }}
              onItemSelect={reportsStore.setValue}
              onPress={reportsStore.toggleBottomSheet}
            />
          </AppBottomSheet>
          <DateTimePickerModal
            isVisible={reportsStore.showCalender}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={new Date(AppStrings.minDate)}
            maximumDate={new Date()}
          />
        </>
      )}
    </Observer>
  );
};

export default ReportsScreen;
