import BottomSheet from '@gorhom/bottom-sheet/';
import {Observer} from 'mobx-react-lite';
import React, {useRef, useState, useEffect} from 'react';
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
    healthStore.calenderShow();
  };

  const hideDatePicker = () => {
    healthStore.calenderHide();
  };

  const handleConfirm = (date: Date) => {
    if (healthStore.calenderID == '1') {
      healthStore.setDOHC(Utility.formatDate(date));
    }
    if (healthStore.calenderID == '2') {
      healthStore.setDOB(Utility.formatDate(date));
      let month_diff = Date.now() - date.getTime();
      let age_dt = new Date(month_diff);
      let year = age_dt.getUTCFullYear();
      var age = Math.abs(year - 1970);
      healthStore.setAge(age);
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
    healthStore.calenderHide();
  };

  return (
    <>
      <AppContainer>
        <Header title={'Health Camp'} />
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding'})}
          style={{flex: 1, backgroundColor: colors.palette.primary}}>
          <View style={styles.backgroundStyle}>
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
              <View style={styles.container}>
                <Text style={styles.headingText}>
                  Enter details related to the Health Camp event
                </Text>

                <>
                  <Observer>
                    {() => (
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
                    )}
                  </Observer>

                  <Observer>
                    {() =>
                      healthStore.partner == 'New' ? (
                        <>
                          <Observer>
                            {() => (
                              <AppTextInput
                                value={healthStore.newPartnerName}
                                parentStyle={styles.textInputStyle}
                                textHeader="NAME OF THE PARTNER"
                                placeHolder="Name of the partner"
                                onChangeText={healthStore.setNewPartnerName}
                              />
                            )}
                          </Observer>

                          <Observer>
                            {() => (
                              <AppTextInput
                                value={healthStore.newLocation}
                                parentStyle={styles.textInputStyle}
                                textHeader="LOCATION"
                                placeHolder="Location"
                                onChangeText={healthStore.setNewLocation}
                              />
                            )}
                          </Observer>

                          <Observer>
                            {() => (
                              <AppTextInput
                                value={healthStore.newBlock}
                                parentStyle={styles.textInputStyle}
                                textHeader="BLOCK"
                                placeHolder="Block"
                                onChangeText={healthStore.setNewBlock}
                              />
                            )}
                          </Observer>

                          <Observer>
                            {() => (
                              <AppTextInput
                                value={healthStore.newDistrict}
                                parentStyle={styles.textInputStyle}
                                textHeader="District"
                                placeHolder="District"
                                onChangeText={healthStore.setNewDistrict}
                              />
                            )}
                          </Observer>

                          <Observer>
                            {() => (
                              <AppTextInput
                                value={healthStore.newState}
                                parentStyle={styles.textInputStyle}
                                textHeader="STATE"
                                placeHolder="State"
                                onChangeText={healthStore.setNewState}
                              />
                            )}
                          </Observer>
                        </>
                      ) : healthStore.partner == 'Existing' ? (
                        <>
                          <Observer>
                            {() => (
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
                            )}
                          </Observer>

                          <Observer>
                            {() => (
                              <AppTextInput
                                parentStyle={styles.textInputStyle}
                                textHeader="LOCATION"
                                placeHolder="Location"
                                value={healthStore.existLocation}
                                //onChangeText={cdStore.setLocation}
                                editable={false}
                              />
                            )}
                          </Observer>

                          <Observer>
                            {() => (
                              <AppTextInput
                                parentStyle={styles.textInputStyle}
                                textHeader="BLOCK"
                                placeHolder="Block"
                                value={healthStore.existBlock}
                                editable={false}
                              />
                            )}
                          </Observer>

                          <Observer>
                            {() => (
                              <AppTextInput
                                parentStyle={styles.textInputStyle}
                                textHeader="District"
                                placeHolder="District"
                                value={healthStore.existDistrict}
                                editable={false}
                              />
                            )}
                          </Observer>

                          <Observer>
                            {() => (
                              <AppTextInput
                                parentStyle={styles.textInputStyle}
                                textHeader="STATE"
                                placeHolder="State"
                                value={healthStore.existState}
                                editable={false}
                              />
                            )}
                          </Observer>
                        </>
                      ) : null
                    }
                  </Observer>
                </>

                <Observer>
                  {() => (
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
                  )}
                </Observer>

                <Observer>
                  {() => (
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
                  )}
                </Observer>

                <Observer>
                  {() => (
                    <AppTextInput
                      parentStyle={styles.textInputStyle}
                      textHeader="Number of Health Camp"
                      placeHolder="Serial Number of Health Camp"
                      value={healthStore.numberHC}
                      onChangeText={healthStore.setNumberHC}
                    />
                  )}
                </Observer>
                <Observer>
                  {() => (
                    <AppTextInput
                      parentStyle={styles.textInputStyle}
                      textHeader="Child's Name"
                      placeHolder="Child's Name"
                      value={healthStore.childName}
                      onChangeText={healthStore.setChildName}
                    />
                  )}
                </Observer>

                <Observer>
                  {() => (
                    <AppImageUploadInput
                      title={"Child's Photo"}
                      selectedImages={selectedImages}
                      onPress={healthStore.togglePhotoBottomSheet}
                      removeImage={removeImage}
                    />
                  )}
                </Observer>

                <Observer>
                  {() => (
                    <AppTextInput
                      parentStyle={styles.textInputStyle}
                      textHeader="Contact Number"
                      placeHolder="Contact Number"
                      value={healthStore.contact}
                      onChangeText={healthStore.setContact}
                    />
                  )}
                </Observer>
                <Observer>
                  {() => (
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
                  )}
                </Observer>
                <Observer>
                  {() => (
                    <AppTextInput
                      parentStyle={styles.textInputStyle}
                      textHeader="Age"
                      placeHolder="Age"
                      value={healthStore.age}
                      editable={false}
                    />
                  )}
                </Observer>
                <Observer>
                  {() => (
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
                  )}
                </Observer>
                <Observer>
                  {() => (
                    <AppTextInput
                      parentStyle={styles.textInputStyle}
                      textHeader="Height"
                      placeHolder="Height"
                      value={healthStore.height}
                      onChangeText={healthStore.setHeight}
                    />
                  )}
                </Observer>
                <Observer>
                  {() => (
                    <AppTextInput
                      parentStyle={styles.textInputStyle}
                      textHeader="Weight"
                      placeHolder="Weight"
                      value={healthStore.weight}
                      onChangeText={healthStore.setWeight}
                    />
                  )}
                </Observer>
                <Observer>
                  {() => (
                    <AppTextInput
                      parentStyle={styles.textInputStyle}
                      textHeader="MUAC"
                      placeHolder="MUAC"
                      value={healthStore.muac}
                      onChangeText={healthStore.setMUAC}
                    />
                  )}
                </Observer>

                <Observer>
                  {() => (
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
                  )}
                </Observer>
                <Observer>
                  {() =>
                    healthStore.vitaminA == 'Done' ? (
                      <>
                        <Observer>
                          {() => (
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
                          )}
                        </Observer>
                        <Observer>
                          {() =>
                            healthStore.doneBy ? (
                              <>
                                <Observer>
                                  {() => (
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
                                  )}
                                </Observer>
                                <Observer>
                                  {() => (
                                    <AppTextInput
                                      parentStyle={styles.textInputStyle}
                                      textHeader="Duration of Course?"
                                      placeHolder="Duration of Course?"
                                      value={healthStore.durationOfCourse}
                                      onChangeText={
                                        healthStore.setDurationOfCourse
                                      }
                                    />
                                  )}
                                </Observer>
                                <Observer>
                                  {() => (
                                    <AppTextInput
                                      parentStyle={styles.textInputStyle}
                                      textHeader="Location of Dose Taken"
                                      placeHolder="Location of Dose Taken"
                                      value={healthStore.locationOfDose}
                                      onChangeText={
                                        healthStore.setLocationOfDose
                                      }
                                    />
                                  )}
                                </Observer>
                              </>
                            ) : null
                          }
                        </Observer>
                      </>
                    ) : null
                  }
                </Observer>

                <Observer>
                  {() => (
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
                  )}
                </Observer>
                <Observer>
                  {() =>
                    healthStore.deworming == 'Done' ? (
                      <>
                        <Observer>
                          {() => (
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
                          )}
                        </Observer>
                        <Observer>
                          {() =>
                            healthStore.doneByWorm ? (
                              <>
                                <Observer>
                                  {() => (
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
                                  )}
                                </Observer>
                                <Observer>
                                  {() => (
                                    <AppTextInput
                                      parentStyle={styles.textInputStyle}
                                      textHeader="Duration of Course"
                                      placeHolder="Duration of Course"
                                      value={healthStore.durationOfCourseWorm}
                                      onChangeText={
                                        healthStore.setDurationOfCourseWorm
                                      }
                                    />
                                  )}
                                </Observer>
                                <Observer>
                                  {() => (
                                    <AppTextInput
                                      parentStyle={styles.textInputStyle}
                                      textHeader="Location of Dose Taken"
                                      placeHolder="Location of Dose Taken"
                                      value={healthStore.locationOfDoseWorm}
                                      onChangeText={
                                        healthStore.setLocationOfDoseWorm
                                      }
                                    />
                                  )}
                                </Observer>
                              </>
                            ) : null
                          }
                        </Observer>
                      </>
                    ) : null
                  }
                </Observer>

                <Observer>
                  {() => (
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
                  )}
                </Observer>
                <Observer>
                  {() =>
                    healthStore.ifa == 'Done' ? (
                      <>
                        <Observer>
                          {() => (
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
                          )}
                        </Observer>
                        <Observer>
                          {() =>
                            healthStore.doneBy ? (
                              <>
                                <Observer>
                                  {() => (
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
                                  )}
                                </Observer>
                                <Observer>
                                  {() => (
                                    <AppTextInput
                                      parentStyle={styles.textInputStyle}
                                      textHeader="Duration of Course"
                                      placeHolder="Duration of Course"
                                      value={healthStore.durationOfCourseIFA}
                                      onChangeText={
                                        healthStore.setDurationOfCourseIFA
                                      }
                                    />
                                  )}
                                </Observer>
                                <Observer>
                                  {() => (
                                    <AppTextInput
                                      parentStyle={styles.textInputStyle}
                                      textHeader="Location of Dose Taken"
                                      placeHolder="Location of Dose Taken"
                                      value={healthStore.locationOfDoseIFA}
                                      onChangeText={
                                        healthStore.setLocationOfDoseIFA
                                      }
                                    />
                                  )}
                                </Observer>
                              </>
                            ) : null
                          }
                        </Observer>
                      </>
                    ) : null
                  }
                </Observer>

                <Observer>
                  {() => (
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
                  )}
                </Observer>

                <Observer>
                  {() => (
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
                  )}
                </Observer>
              </View>
            </ScrollView>
            <Observer>
              {() => (
                <AppButton
                  title="Save"
                  style={styles.buttonStyle}
                  width={'90%'}
                  isLoading={healthStore.isLoading}
                  onPress={() => {
                    healthStore.handleImageUpload(selectedImages);
                  }}
                  enabled={healthStore.enableSubmit}
                />
              )}
            </Observer>
          </View>
        </KeyboardAvoidingView>
      </AppContainer>
      <Observer>
        {() => (
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
        )}
      </Observer>
      <Observer>
        {() => (
          <DateTimePickerModal
            isVisible={healthStore.showCalender}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date()}
          />
        )}
      </Observer>
      <Observer>
        {() => (
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
        )}
      </Observer>
    </>
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
