import BottomSheet from '@gorhom/bottom-sheet/';
import {useRoute} from '@react-navigation/native';
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
  AppButton,
  AppContainer,
  AppTextInput,
  DoctorRow,
  AppBottomSheet,
  AppBottomSheetDropdown,
  AppInput,
  Header,
} from '../components';

import {AppSVGs} from '../assets';
import {DoctorScreenRouteProp} from '../navigation/DoctorStack';
import {useDoctorStore} from '../stores';
import {styles} from '../styles/formStyles';
type Props = {};

const DocObservationScreen = ({}: Props) => {
  const route = useRoute<DoctorScreenRouteProp>();
  const {id} = route.params;
  const doctorStore = useDoctorStore();
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const hideBottomSheet = () => {
    doctorStore.toggleBottomSheet();
  };
  const handleBottomSheetClick = () => {
    doctorStore.toggleBottomSheet();
  };
  return (
    <Observer>
      {() => (
        <>
          <AppContainer>
            <Header title={'Health Camp'} />
            <KeyboardAvoidingView
              behavior={Platform.select({ios: 'padding'})}
              style={styles.keyboardAwoidStyle}>
              <View style={styles.backgroundStyle}>
                <ScrollView
                  contentContainerStyle={styles.contentContainerStyle}>
                  <Pressable style={styles.container}>
                    <Text style={styles.headingText}>
                      Doctor's Observation Entry
                    </Text>

                    {Object.keys(doctorStore.doctorObservation).map(
                      bodyPart => (
                        <DoctorRow
                          textHeader={bodyPart}
                          data={doctorStore.doctorObservation[bodyPart]}
                          key={bodyPart}
                          parentStyle={{marginBottom: 20}}
                        />
                      ),
                    )}

                    <AppTextInput
                      value={doctorStore.others}
                      parentStyle={styles.textInputStyle}
                      textHeader="OTHERS"
                      placeHolder="Others"
                      onChangeText={doctorStore.setOthers}
                    />

                    <AppInput
                      onPress={() => {
                        handleBottomSheetClick();
                      }}
                      parentStyle={styles.textInputStyle}
                      value={doctorStore.hospital}
                      textHeader="Referred to Hospital/ Medical Care"
                      placeHolder="Referred to Hospital/ Medical Care"
                      rightIcon={AppSVGs.dropdown}
                    />
                    {doctorStore.hospital === 'Yes' && (
                      <AppTextInput
                        value={doctorStore.action}
                        parentStyle={styles.textInputStyle}
                        textHeader="Action Suggested"
                        placeHolder="Action Suggested"
                        onChangeText={doctorStore.setAction}
                      />
                    )}
                  </Pressable>
                </ScrollView>
                <AppButton
                  title="Submit"
                  style={styles.buttonStyle}
                  width={'90%'}
                  isLoading={doctorStore.isLoading}
                  onPress={() => {
                    doctorStore.saveData(id);
                  }}
                  enabled={doctorStore.enableSubmit}
                />
              </View>
            </KeyboardAvoidingView>
          </AppContainer>
          <AppBottomSheet
            isVisible={doctorStore.openBottomSheet}
            onClose={hideBottomSheet}
            index={doctorStore.index}
            ref={bottomSheetRef}>
            <AppBottomSheetDropdown
              header={doctorStore.bottomSheetHeader}
              data={doctorStore.bottomSheetArray}
              onClose={() => {
                bottomSheetRef?.current?.close();
                doctorStore.toggleBottomSheet();
              }}
              onItemSelect={doctorStore.setValue}
              onPress={doctorStore.toggleBottomSheet}
            />
          </AppBottomSheet>
        </>
      )}
    </Observer>
  );
};

export default DocObservationScreen;
