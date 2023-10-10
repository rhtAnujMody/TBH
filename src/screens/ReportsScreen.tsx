import BottomSheet from '@gorhom/bottom-sheet/';
import {Observer} from 'mobx-react-lite';
import React, {useRef} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppBottomSheet from '../components/common/AppBottomSheet';
import {AppBottomSheetDropdown} from '../components/common/AppBottomSheetDropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {AppSVGs} from '../assets';
import {AppButton, AppContainer, AppTextInput} from '../components';
import AppInput from '../components/common/AppInput';
import Header from '../components/common/Header';
import {colors, typography} from '../theme';
import useReportsStore from '../stores/useReportsStore';
import Utility from '../utils/Utility';
import {RouteProp, useRoute} from '@react-navigation/native';
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
              style={styles.keyboardAwaidStyle}>
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
  hourContainer: {
    flexDirection: 'row',
  },
  hourMinute: {flex: 1, paddingRight: 10},
  keyboardAwaidStyle: {flex: 1, backgroundColor: colors.palette.primary},
});
