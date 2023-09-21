import BottomSheet from '@gorhom/bottom-sheet/';
import {Observer} from 'mobx-react-lite';
import React, {useEffect, useRef} from 'react';
import {AppSVGs} from '../assets';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  AppInput,
  AppImageUploadInput,
  AppContainer,
  AppTextInput,
  AppButton,
  AppToggle,
  Header,
  AppBottomSheetDropdown,
  AppBottomSheet,
} from '../components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DashedLine from 'react-native-dashed-line';

import Utility from '../utils/Utility';
import {colors} from '../theme';
import {useHealthStore} from '../stores';
import {useCamera} from '../custom_hooks';
import {styles} from '../styles/formStyles';

const HealthCampScreen = () => {
  const healthStore = useHealthStore();
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const {openGallery, removeImage, takePhotoFromCamera, selectedImages} =
    useCamera();

  const handleBottomSheetClick = (from: string, index?: number) => {
    healthStore.setIndex(index ?? 1);
    healthStore.toggleBottomSheet(from);
  };

  const hideBottomSheet = () => {
    healthStore.toggleBottomSheet();
  };

  const handleImagePicker = (from: number) => {
    healthStore.togglePhotoBottomSheet();
    if (from === 1) {
      takePhotoFromCamera();
    } else {
      openGallery();
    }
  };

  const showDatePicker = (id: string) => {
    healthStore.setCalenderID(id);
    healthStore.toogleCalender();
  };

  const hideDatePicker = () => {
    healthStore.toogleCalender();
  };

  useEffect(() => {
    healthStore.getItem();
  }, []);

  const handleConfirm = (date: Date) => {
    switch (healthStore.calenderID) {
      case '1':
        healthStore.setDOHC(Utility.formatDate(date));
        break;
      case '2':
        healthStore.setDOB(Utility.formatDate(date));
        healthStore.setAge(
          Utility.calculateAgeInMonths(Utility.formatDate(date)),
        );
        break;
      case '3':
        healthStore.setDateOfDoseVitamin(Utility.formatDate(date));
        break;
      case '4':
        healthStore.setDateOfDoseDeworm(Utility.formatDate(date));
        break;
      case '5':
        healthStore.setDateOfDoseIFA(Utility.formatDate(date));
        break;
    }
    healthStore.toogleCalender();
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
                  <Pressable>
                    <View style={styles.container}>
                      <Text style={styles.headingText}>
                        Enter details related to the Health Camp event
                      </Text>

                      <AppToggle
                        title={'Partner Details'}
                        children={
                          <>
                            <AppInput
                              onPress={() => {
                                handleBottomSheetClick('partner');
                              }}
                              parentStyle={styles.textInputStyle}
                              value={healthStore.partner}
                              textHeader="IS THIS A NEW / EXISTING PARTNER"
                              placeHolder="Is this a New / Existing Partner"
                              rightIcon={AppSVGs.dropdown}
                            />
                            {healthStore.partner === 'New' ? (
                              <>
                                <AppTextInput
                                  value={healthStore.newPartnerName}
                                  parentStyle={styles.textInputStyle}
                                  textHeader="NAME OF THE PARTNER"
                                  placeHolder="Name of the partner"
                                  onChangeText={healthStore.setNewPartnerName}
                                />

                                <AppTextInput
                                  value={healthStore.newLocation}
                                  parentStyle={styles.textInputStyle}
                                  textHeader="LOCATION"
                                  placeHolder="Location"
                                  onChangeText={healthStore.setNewLocation}
                                />

                                <AppTextInput
                                  value={healthStore.newBlock}
                                  parentStyle={styles.textInputStyle}
                                  textHeader="BLOCK"
                                  placeHolder="Block"
                                  onChangeText={healthStore.setNewBlock}
                                />

                                <AppTextInput
                                  value={healthStore.newDistrict}
                                  parentStyle={styles.textInputStyle}
                                  textHeader="DISTRICT"
                                  placeHolder="District"
                                  onChangeText={healthStore.setNewDistrict}
                                />

                                <AppTextInput
                                  value={healthStore.newState}
                                  parentStyle={styles.textInputStyle}
                                  textHeader="STATE"
                                  placeHolder="State"
                                  onChangeText={healthStore.setNewState}
                                />
                              </>
                            ) : healthStore.partner === 'Existing' ? (
                              <>
                                <AppInput
                                  onPress={() => {
                                    handleBottomSheetClick('partnerName');
                                    healthStore.setIndex(3);
                                  }}
                                  parentStyle={styles.textInputStyle}
                                  value={healthStore.existPartnerName}
                                  textHeader="NAME OF THE PARTNER"
                                  placeHolder="Name of the partner"
                                  rightIcon={AppSVGs.dropdown}
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader="LOCATION"
                                  placeHolder="Location"
                                  value={healthStore.existLocation}
                                  //onChangeText={cdStore.setLocation}
                                  editable={false}
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader="BLOCK"
                                  placeHolder="Block"
                                  value={healthStore.existBlock}
                                  editable={false}
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader="DISTRICT"
                                  placeHolder="District"
                                  value={healthStore.existDistrict}
                                  editable={false}
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader="STATE"
                                  placeHolder="State"
                                  value={healthStore.existState}
                                  editable={false}
                                />
                              </>
                            ) : null}

                            <AppInput
                              onPress={() => {
                                handleBottomSheetClick('partnerType', 3);
                              }}
                              parentStyle={styles.textInputStyle}
                              value={healthStore.partnerType}
                              textHeader="PARTNER TYPE"
                              placeHolder="Partner Type"
                              rightIcon={AppSVGs.dropdown}
                            />
                          </>
                        }
                      />

                      <DashedLine
                        dashLength={5}
                        dashThickness={0.7}
                        dashColor={colors.gray}
                      />

                      <AppToggle
                        title={'Health Camp Details'}
                        children={
                          <>
                            <AppTextInput
                              parentStyle={styles.dovInputStyle}
                              textHeader="Date of Health Camp"
                              rightIcon={AppSVGs.dob}
                              placeHolder="Date of Health Camp"
                              hideInput={true}
                              onPress={() => {
                                showDatePicker('1');
                              }}
                              otherText={healthStore.dohc}
                            />

                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader="Number of Health Camp"
                              placeHolder="Number of Health Camp"
                              value={healthStore.numberHC}
                              onChangeText={healthStore.setNumberHC}
                            />
                          </>
                        }
                      />

                      <DashedLine
                        dashLength={5}
                        dashThickness={0.7}
                        dashColor={colors.gray}
                      />

                      <AppToggle
                        title={"Child's Details"}
                        children={
                          <>
                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader="Child's Name"
                              placeHolder="Child's Name"
                              value={healthStore.childName}
                              onChangeText={healthStore.setChildName}
                            />

                            <AppImageUploadInput
                              title={"Child's Photo"}
                              selectedImages={selectedImages}
                              onPress={healthStore.togglePhotoBottomSheet}
                              removeImage={removeImage}
                            />

                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader="Contact Number"
                              placeHolder="Contact Number"
                              value={healthStore.contact}
                              onChangeText={healthStore.setContact}
                              maxLength={10}
                            />

                            <AppTextInput
                              parentStyle={styles.dovInputStyle}
                              textHeader="Date of Birth"
                              rightIcon={AppSVGs.dob}
                              placeHolder="Date of Birth"
                              hideInput={true}
                              onPress={() => {
                                showDatePicker('2');
                              }}
                              otherText={healthStore.dob}
                            />

                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader="Age (In Months)"
                              placeHolder="Age (In Months)"
                              value={healthStore.age}
                              editable={false}
                            />

                            <AppInput
                              onPress={() => {
                                handleBottomSheetClick('gender', 3);
                              }}
                              parentStyle={styles.textInputStyle}
                              value={healthStore.gender}
                              textHeader="Gender"
                              placeHolder="Gender"
                              rightIcon={AppSVGs.dropdown}
                            />

                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader="Height"
                              placeHolder="Height(CM)"
                              value={healthStore.height}
                              onChangeText={healthStore.setHeight}
                            />

                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader="Weight"
                              placeHolder="Weight(KG)"
                              value={healthStore.weight}
                              onChangeText={healthStore.setWeight}
                            />

                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader="MUAC"
                              placeHolder="MUAC(CM)"
                              value={healthStore.muac}
                              onChangeText={healthStore.setMUAC}
                            />

                            <AppInput
                              onPress={() => {
                                handleBottomSheetClick('vitaminA', 3);
                              }}
                              parentStyle={styles.textInputStyle}
                              value={healthStore.vitaminA}
                              textHeader="Vitamin A"
                              placeHolder="Vitamin A"
                              rightIcon={AppSVGs.dropdown}
                            />

                            {healthStore.vitaminA === 'Done' && (
                              <>
                                <AppInput
                                  onPress={() => {
                                    handleBottomSheetClick('doneBy', 3);
                                  }}
                                  parentStyle={styles.textInputStyle}
                                  value={healthStore.doneBy}
                                  textHeader="Done By Whom"
                                  placeHolder="Done By Whom"
                                  rightIcon={AppSVGs.dropdown}
                                />
                                {healthStore.doneBy && (
                                  <>
                                    <AppTextInput
                                      parentStyle={styles.dovInputStyle}
                                      textHeader="Date of the Dose"
                                      rightIcon={AppSVGs.dob}
                                      placeHolder="Date of the Dose"
                                      hideInput={true}
                                      onPress={() => {
                                        showDatePicker('3');
                                      }}
                                      otherText={healthStore.dateOfDoseVitamin}
                                    />

                                    <AppTextInput
                                      parentStyle={styles.textInputStyle}
                                      textHeader="Duration of Course?"
                                      placeHolder="Duration of Course?"
                                      value={healthStore.durationOfCourse}
                                      onChangeText={
                                        healthStore.setDurationOfCourse
                                      }
                                    />

                                    <AppTextInput
                                      parentStyle={styles.textInputStyle}
                                      textHeader="Location of Dose Taken"
                                      placeHolder="Location of Dose Taken"
                                      value={healthStore.locationOfDose}
                                      onChangeText={
                                        healthStore.setLocationOfDose
                                      }
                                    />
                                  </>
                                )}
                              </>
                            )}

                            <AppInput
                              onPress={() => {
                                handleBottomSheetClick('deworming', 3);
                              }}
                              parentStyle={styles.textInputStyle}
                              value={healthStore.deworming}
                              textHeader="Deworming"
                              placeHolder="Deworming"
                              rightIcon={AppSVGs.dropdown}
                            />

                            {healthStore.deworming === 'Done' && (
                              <>
                                <AppInput
                                  onPress={() => {
                                    handleBottomSheetClick('doneByWorm', 3);
                                  }}
                                  parentStyle={styles.textInputStyle}
                                  value={healthStore.doneByWorm}
                                  textHeader="Done By Whom"
                                  placeHolder="Done By Whom"
                                  rightIcon={AppSVGs.dropdown}
                                />

                                {healthStore.doneByWorm && (
                                  <>
                                    <AppTextInput
                                      parentStyle={styles.dovInputStyle}
                                      textHeader="Date of the Dose"
                                      rightIcon={AppSVGs.dob}
                                      placeHolder="Date of the Dose"
                                      hideInput={true}
                                      onPress={() => {
                                        showDatePicker('4');
                                      }}
                                      otherText={healthStore.dateOfDoseDeworm}
                                    />

                                    <AppTextInput
                                      parentStyle={styles.textInputStyle}
                                      textHeader="Duration of Course"
                                      placeHolder="Duration of Course"
                                      value={healthStore.durationOfCourseWorm}
                                      onChangeText={
                                        healthStore.setDurationOfCourseWorm
                                      }
                                    />

                                    <AppTextInput
                                      parentStyle={styles.textInputStyle}
                                      textHeader="Location of Dose Taken"
                                      placeHolder="Location of Dose Taken"
                                      value={healthStore.locationOfDoseWorm}
                                      onChangeText={
                                        healthStore.setLocationOfDoseWorm
                                      }
                                    />
                                  </>
                                )}
                              </>
                            )}

                            <AppInput
                              onPress={() => {
                                handleBottomSheetClick('IFA', 3);
                              }}
                              parentStyle={styles.textInputStyle}
                              value={healthStore.ifa}
                              textHeader="IFA"
                              placeHolder="IFA"
                              rightIcon={AppSVGs.dropdown}
                            />

                            {healthStore.ifa === 'Done' && (
                              <>
                                <AppInput
                                  onPress={() => {
                                    handleBottomSheetClick('doneByIFA', 3);
                                  }}
                                  parentStyle={styles.textInputStyle}
                                  value={healthStore.doneByIFA}
                                  textHeader="Done By Whom"
                                  placeHolder="Done By Whom"
                                  rightIcon={AppSVGs.dropdown}
                                />

                                {healthStore.doneByIFA && (
                                  <>
                                    <AppTextInput
                                      parentStyle={styles.dovInputStyle}
                                      textHeader="Date of the Dose"
                                      rightIcon={AppSVGs.dob}
                                      placeHolder="Date of the Dose"
                                      hideInput={true}
                                      onPress={() => {
                                        showDatePicker('5');
                                      }}
                                      otherText={healthStore.dateOfDoseIFA}
                                    />

                                    <AppTextInput
                                      parentStyle={styles.textInputStyle}
                                      textHeader="Duration of Course"
                                      placeHolder="Duration of Course"
                                      value={healthStore.durationOfCourseIFA}
                                      onChangeText={
                                        healthStore.setDurationOfCourseIFA
                                      }
                                    />

                                    <AppTextInput
                                      parentStyle={styles.textInputStyle}
                                      textHeader="Location of Dose Taken"
                                      placeHolder="Location of Dose Taken"
                                      value={healthStore.locationOfDoseIFA}
                                      onChangeText={
                                        healthStore.setLocationOfDoseIFA
                                      }
                                    />
                                  </>
                                )}
                              </>
                            )}

                            <AppInput
                              onPress={() => {
                                handleBottomSheetClick('targetBeneficiary', 3);
                              }}
                              parentStyle={styles.textInputStyle}
                              value={healthStore.targetBeneficiary}
                              textHeader="Target Beneficiary"
                              placeHolder="Target Beneficiary"
                              rightIcon={AppSVGs.dropdown}
                            />

                            <AppInput
                              onPress={() => {
                                handleBottomSheetClick('educationalDetails', 3);
                              }}
                              parentStyle={styles.textInputStyle}
                              value={healthStore.educationalDetails}
                              textHeader="Educational Details"
                              placeHolder="Educational Details"
                              rightIcon={AppSVGs.dropdown}
                            />
                          </>
                        }
                      />
                    </View>
                  </Pressable>
                </ScrollView>

                <AppButton
                  title="Submit"
                  style={styles.buttonStyle}
                  width={'90%'}
                  isLoading={healthStore.isLoading}
                  onPress={() => {
                    healthStore.setSelectedImages(selectedImages);
                    healthStore.handleSubmit();
                  }}
                  enabled={healthStore.enableSubmit}
                />
              </View>
            </KeyboardAvoidingView>
          </AppContainer>

          <AppBottomSheet
            isVisible={healthStore.openBottomSheet}
            onClose={hideBottomSheet}
            index={healthStore.index}
            ref={bottomSheetRef}>
            <AppBottomSheetDropdown
              header={healthStore.bottomSheetHeader}
              data={healthStore.bottomSheetArray}
              onClose={() => {
                bottomSheetRef?.current?.close();
                healthStore.toggleBottomSheet();
              }}
              onItemSelect={healthStore.setValue}
              onPress={healthStore.toggleBottomSheet}
            />
          </AppBottomSheet>

          <DateTimePickerModal
            isVisible={healthStore.showCalender}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date()}
          />

          <AppBottomSheet
            isVisible={healthStore.openPhotoBottomSheet}
            onClose={healthStore.togglePhotoBottomSheet}
            index={healthStore.index}
            ref={bottomSheetRef}>
            <View>
              <View style={styles.headerContainer}>
                <Text style={styles.headerStyle}>Upload Photo</Text>
                <TouchableOpacity onPress={healthStore.togglePhotoBottomSheet}>
                  <AppSVGs.close />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.photoContainerStyle}
                onPress={() => {
                  handleImagePicker(1);
                }}>
                <Text>Take a Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.photoContainerStyle}
                onPress={() => {
                  handleImagePicker(2);
                }}>
                <Text>Upload from Library</Text>
              </TouchableOpacity>
            </View>
          </AppBottomSheet>
        </>
      )}
    </Observer>
  );
};

export default HealthCampScreen;
