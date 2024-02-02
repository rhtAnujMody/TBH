import BottomSheet from '@gorhom/bottom-sheet/';
import {useRoute} from '@react-navigation/native';
import {Observer} from 'mobx-react-lite';
import React, {useEffect, useRef} from 'react';
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
  AppInput,
  AppTextInput,
  DoctorRow,
  Header,
} from '../components';

import {AppSVGs} from '../assets';
import {DoctorScreenRouteProp} from '../navigation/DoctorStack';
import {useDoctorStore} from '../stores';
import {styles} from '../styles/formStyles';
import AppStrings from '../utils/AppStrings';
type Props = {};

const DocObservationScreen = ({}: Props) => {
  const route = useRoute<DoctorScreenRouteProp>();
  const {id, doctor_observation} = route.params;
  const doctorStore = useDoctorStore();
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const hideBottomSheet = () => {
    doctorStore.toggleBottomSheet();
  };
  const handleBottomSheetClick = () => {
    doctorStore.toggleBottomSheet();
  };

  useEffect(() => {
    if (doctor_observation !== null) {
      let doctor_length = doctor_observation.length;
      doctorStore.setOthers(doctor_observation[doctor_length - 1].others);
      doctor_observation[doctor_length - 1].is_referred_to_hospital
        ? doctorStore.setHospital(AppStrings.yes)
        : doctorStore.setHospital(AppStrings.no);
      doctorStore.setAction(
        doctor_observation[doctor_length - 1].action_suggested,
      );

      doctorStore.setIsEditable(false);
      doctorStore.setSubmitEditButton(AppStrings.edit);
    }

    if (doctorStore.isAdmin) {
      doctorStore.setIsEditable(true);
    }

    const updateDoctorObservation = () => {
      Object.keys(doctorStore.doctorObservation).map(itemId => {
        doctorStore.doctorObservation[itemId].map(item => {
          item.isSelected = false;
          item.isDisable = false;
        });
      });
    };
    return () => {
      updateDoctorObservation();
    };
  }, []);

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
                  <Pressable style={styles.container}>
                    <Text style={styles.headingText}>
                      {AppStrings.HOME_CARDS.observationEntry}
                    </Text>

                    {Object.keys(doctorStore.doctorObservation).map(
                      bodyPart => {
                        doctorStore.doctorObservation[bodyPart].map(obj => {
                          if (
                            doctor_observation &&
                            doctor_observation[doctor_observation.length - 1][
                              'observation'
                            ].includes(obj.id)
                          ) {
                            obj.isSelected = true;
                          }

                          obj.isDisable = !doctorStore.isEditable;

                          // if (!doctorStore.isAdmin) {
                          //   obj.isDisable = true;
                          // }

                          // if (doctorStore.isEditable) {
                          //   obj.isDisable = false;
                          // }
                        });
                        return (
                          <DoctorRow
                            textHeader={bodyPart}
                            data={doctorStore.doctorObservation[bodyPart]}
                            key={bodyPart}
                            parentStyle={{marginBottom: 20}}
                          />
                        );
                      },
                    )}

                    <AppTextInput
                      value={doctorStore.others}
                      parentStyle={styles.textInputStyle}
                      textHeader={AppStrings.othersCaps}
                      placeHolder={AppStrings.others}
                      onChangeText={doctorStore.setOthers}
                      editable={doctorStore.isEditable}
                    />

                    <AppInput
                      onPress={() => {
                        if (doctorStore.isEditable) {
                          handleBottomSheetClick();
                        }
                      }}
                      parentStyle={styles.textInputStyle}
                      value={doctorStore.hospital}
                      textHeader={AppStrings.referredHospital}
                      placeHolder={AppStrings.referredHospital}
                      rightIcon={AppSVGs.dropdown}
                    />
                    {doctorStore.hospital === AppStrings.yes && (
                      <AppTextInput
                        value={doctorStore.action}
                        parentStyle={styles.textInputStyle}
                        textHeader={AppStrings.actionSuggested}
                        placeHolder={AppStrings.actionSuggested}
                        onChangeText={doctorStore.setAction}
                        editable={doctorStore.isEditable}
                      />
                    )}
                  </Pressable>
                </ScrollView>
                <AppButton
                  title={doctorStore.submitEditButon}
                  style={styles.buttonStyle}
                  width={'90%'}
                  isLoading={doctorStore.isLoading}
                  onPress={() => {
                    doctorStore.saveData(id);
                  }}
                  enabled={doctorStore.enableSubmit && doctorStore.isEditable}
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
