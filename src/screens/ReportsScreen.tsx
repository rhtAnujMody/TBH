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

import {
  writeFile,
  readFile,
  DocumentDirectoryPath,
  DownloadDirectoryPath,
} from 'react-native-fs';
import XLSX from 'xlsx';

const ReportsScreen = () => {
  const reportsStore = useReportsStore();
  const route = useRoute<RouteProp<DashboardStackRootParamList, 'Reports'>>();
  const {data, id} = route.params;
  const bottomSheetRef = useRef<BottomSheet | null>(null);

  const DDP = DownloadDirectoryPath + '/';
  const input = (res: any) => res;
  const output = (str: any) => str;
  const exportDataToExcel = () => {
    // Created Sample data
    let data = [
      {id: '1', name: 'First User'},
      {id: '2', name: 'Second User'},
    ];
    let ws = XLSX.utils.json_to_sheet(data);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');

    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

    const file = DDP + 'sheet.xlsx';

    // Write generated excel to Storage
    writeFile(file, output(wbout), 'ascii')
      .then((r: any) => {
        console.log('Success');
      })
      .catch((e: any) => {
        console.log('Error', e);
      });
  };
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
    exportDataToExcel();
    //reportsStore.saveData(id);
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
            <Header title={'Generate Report'} />
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
                        textHeader="Start Date"
                        rightIcon={AppSVGs.dob}
                        placeHolder="Start Date"
                        hideInput={true}
                        onPress={() => {
                          showDatePicker('1');
                        }}
                        otherText={reportsStore.fromDate}
                      />
                      <AppTextInput
                        parentStyle={styles.dovInputStyle}
                        textHeader="End Date"
                        rightIcon={AppSVGs.dob}
                        placeHolder="End Date"
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
                        textHeader="Partner Name, Loation"
                        placeHolder="Partner Name, Location"
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
                  title="Save"
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
            minimumDate={new Date('2014-01-01')}
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
