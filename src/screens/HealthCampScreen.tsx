import BottomSheet from '@gorhom/bottom-sheet/';
import {Observer} from 'mobx-react-lite';
import React, {useRef} from 'react';
import {AppSVGs} from '../assets';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import AppInput from '../components/common/AppInput';
import AppImageUploadInput from '../components/common/AppImageUploadInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Utility from '../utils/Utility';
import {AppContainer, AppTextInput, AppButton} from '../components';
import Header from '../components/common/Header';
import {colors, typography} from '../theme';
import useHealthStore from '../stores/useHealthStore';
import {AppBottomSheetDropdown} from '../components/common/AppBottomSheetDropdown';
import AppBottomSheet from '../components/common/AppBottomSheet';
import useCamera from '../custom_hooks/useCamera';

const HealthCampScreen = () => {
  const healthStore = useHealthStore();

  const bottomSheetRef = useRef<BottomSheet | null>(null);

  const {openGallery, removeImage, takePhotoFromCamera, selectedImages} =
    useCamera(healthStore.togglePhotoBottomSheet);

  const handleBottomSheetClick = (from: string) => {
    healthStore.toggleBottomSheet(from);
  };

  const handleIndex = (value: number) => {
    healthStore.setIndex(value);
  };

  const hideBottomSheet = () => {
    healthStore.toggleBottomSheet();
  };

  const showDatePicker = (id: string) => {
    healthStore.setCalenderID(id);
    healthStore.toogleCalender();
  };

  const hideDatePicker = () => {
    healthStore.toogleCalender();
  };

  const handleConfirm = (date: Date) => {
    if (healthStore.calenderID == '1') {
      healthStore.setDOHC(Utility.formatDate(date));
    }
    if (healthStore.calenderID == '2') {
      healthStore.setDOB(Utility.formatDate(date));
      healthStore.setAge(Utility.getAge(date));
    }
    if (healthStore.calenderID == '3') {
      healthStore.setDateOfDoseVitamin(Utility.formatDate(date));
    }
    if (healthStore.calenderID == '4') {
      healthStore.setDateOfDoseDeworm(Utility.formatDate(date));
    }
    if (healthStore.calenderID == '5') {
      healthStore.setDateOfDoseIFA(Utility.formatDate(date));
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
                  <View style={styles.container}>
                    <Text style={styles.headingText}>
                      Enter details related to the Health Camp event
                    </Text>

                    <AppInput
                      onPress={() => {
                        handleBottomSheetClick('partner');
                        handleIndex(1);
                      }}
                      parentStyle={styles.textInputStyle}
                      value={healthStore.partner}
                      textHeader="IS THIS A NEW / EXISTING PARTNER"
                      placeHolder="Is this a New / Existing Partner"
                      rightIcon={AppSVGs.dropdown}
                    />
                    {healthStore.partner == 'New' ? (
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
                          textHeader="District"
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
                    ) : healthStore.partner == 'Existing' ? (
                      <>
                        <AppInput
                          onPress={() => {
                            handleBottomSheetClick('partnerName');
                            handleIndex(1);
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
                          textHeader="District"
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
                        handleBottomSheetClick('partnerType');
                        handleIndex(3);
                      }}
                      parentStyle={styles.textInputStyle}
                      value={healthStore.partnerType}
                      textHeader="PARTNER TYPE"
                      placeHolder="Partner Type"
                      rightIcon={AppSVGs.dropdown}
                    />

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
                      placeHolder="Serial Number of Health Camp"
                      value={healthStore.numberHC}
                      onChangeText={healthStore.setNumberHC}
                    />

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
                      textHeader="Age"
                      placeHolder="Age"
                      value={healthStore.age}
                      editable={false}
                    />

                    <AppInput
                      onPress={() => {
                        handleBottomSheetClick('gender');
                        handleIndex(3);
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
                        handleBottomSheetClick('vitaminA');
                        handleIndex(3);
                      }}
                      parentStyle={styles.textInputStyle}
                      value={healthStore.vitaminA}
                      textHeader="Vitamin A"
                      placeHolder="Vitamin A"
                      rightIcon={AppSVGs.dropdown}
                    />

                    {healthStore.vitaminA == 'Done' ? (
                      <>
                        <AppInput
                          onPress={() => {
                            handleBottomSheetClick('doneBy');
                            handleIndex(3);
                          }}
                          parentStyle={styles.textInputStyle}
                          value={healthStore.doneBy}
                          textHeader="Done By Whom"
                          placeHolder="Done By Whom"
                          rightIcon={AppSVGs.dropdown}
                        />
                        {healthStore.doneBy ? (
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
                              onChangeText={healthStore.setDurationOfCourse}
                            />

                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader="Location of Dose Taken"
                              placeHolder="Location of Dose Taken"
                              value={healthStore.locationOfDose}
                              onChangeText={healthStore.setLocationOfDose}
                            />
                          </>
                        ) : null}
                      </>
                    ) : null}

                    <AppInput
                      onPress={() => {
                        handleBottomSheetClick('deworming');
                        handleIndex(3);
                      }}
                      parentStyle={styles.textInputStyle}
                      value={healthStore.deworming}
                      textHeader="Deworming"
                      placeHolder="Deworming"
                      rightIcon={AppSVGs.dropdown}
                    />

                    {healthStore.deworming == 'Done' ? (
                      <>
                        <AppInput
                          onPress={() => {
                            handleBottomSheetClick('doneByWorm');
                            handleIndex(3);
                          }}
                          parentStyle={styles.textInputStyle}
                          value={healthStore.doneByWorm}
                          textHeader="Done By Whom"
                          placeHolder="Done By Whom"
                          rightIcon={AppSVGs.dropdown}
                        />

                        {healthStore.doneByWorm ? (
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
                              onChangeText={healthStore.setDurationOfCourseWorm}
                            />

                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader="Location of Dose Taken"
                              placeHolder="Location of Dose Taken"
                              value={healthStore.locationOfDoseWorm}
                              onChangeText={healthStore.setLocationOfDoseWorm}
                            />
                          </>
                        ) : null}
                      </>
                    ) : null}

                    <AppInput
                      onPress={() => {
                        handleBottomSheetClick('IFA');
                        handleIndex(3);
                      }}
                      parentStyle={styles.textInputStyle}
                      value={healthStore.ifa}
                      textHeader="IFA"
                      placeHolder="IFA"
                      rightIcon={AppSVGs.dropdown}
                    />

                    {healthStore.ifa == 'Done' ? (
                      <>
                        <AppInput
                          onPress={() => {
                            handleBottomSheetClick('doneByIFA');
                            handleIndex(3);
                          }}
                          parentStyle={styles.textInputStyle}
                          value={healthStore.doneByIFA}
                          textHeader="Done By Whom"
                          placeHolder="Done By Whom"
                          rightIcon={AppSVGs.dropdown}
                        />

                        {healthStore.doneBy ? (
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
                              onChangeText={healthStore.setDurationOfCourseIFA}
                            />

                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader="Location of Dose Taken"
                              placeHolder="Location of Dose Taken"
                              value={healthStore.locationOfDoseIFA}
                              onChangeText={healthStore.setLocationOfDoseIFA}
                            />
                          </>
                        ) : null}
                      </>
                    ) : null}

                    <AppInput
                      onPress={() => {
                        handleBottomSheetClick('targetBeneficiary');
                        handleIndex(3);
                      }}
                      parentStyle={styles.textInputStyle}
                      value={healthStore.targetBeneficiary}
                      textHeader="Target Beneficiary"
                      placeHolder="Target Beneficiary"
                      rightIcon={AppSVGs.dropdown}
                    />

                    <AppInput
                      onPress={() => {
                        handleBottomSheetClick('educationalDetails');
                        handleIndex(3);
                      }}
                      parentStyle={styles.textInputStyle}
                      value={healthStore.educationalDetails}
                      textHeader="Educational Details"
                      placeHolder="Educational Details"
                      rightIcon={AppSVGs.dropdown}
                    />
                  </View>
                </ScrollView>

                <AppButton
                  title="Save"
                  style={styles.buttonStyle}
                  width={'90%'}
                  isLoading={healthStore.isLoading}
                  onPress={() => {
                    healthStore.handleSubmit(selectedImages);
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
              setValue={() => {}}
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
                onPress={takePhotoFromCamera}>
                <Text>Take a Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.photoContainerStyle}
                onPress={openGallery}>
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
  keyboardAwoidStyle: {flex: 1, backgroundColor: colors.palette.primary},
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
