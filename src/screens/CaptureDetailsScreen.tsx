import BottomSheet from '@gorhom/bottom-sheet/';
import {Observer} from 'mobx-react-lite';
import React, {useRef} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {AppSVGs} from '../assets';
import {
  AppBottomSheet,
  AppBottomSheetDropdown,
  AppButton,
  AppContainer,
  AppImageUploadInput,
  AppInput,
  AppTextInput,
  AppToggle,
  Header,
  AppDashedLine,
} from '../components';
import {useCamera} from '../custom_hooks';
import {authStore, useCaptureDetailsStore} from '../stores';
import {styles} from '../styles/formStyles';
import {colors} from '../theme';
import AppStrings from '../utils/AppStrings';
import Utility from '../utils/Utility';

const CaptureDetailsScreen = () => {
  const cdStore = useCaptureDetailsStore();
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const {openGallery, removeImage, takePhotoFromCamera, selectedImages} =
    useCamera();

  const handleImagePicker = (from: number) => {
    cdStore.togglePhotoBottomSheet();
    if (from === 1) {
      takePhotoFromCamera();
    } else {
      openGallery();
    }
  };

  const handleBottomSheetClick = (from: string) => {
    cdStore.toggleBottomSheet(from);
  };

  const hideBottomSheet = () => {
    cdStore.toggleBottomSheet();
    cdStore.setShowSearchBar(false);
  };

  const handleIndex = (value: number) => {
    cdStore.setIndex(value);
  };

  const showDatePicker = () => {
    cdStore.toogleCalender();
  };

  const hideDatePicker = () => {
    cdStore.toogleCalender();
  };

  const handleConfirm = (date: Date) => {
    cdStore.setDOV(Utility.formatDate(date));
    hideDatePicker();
  };

  Utility.logData(authStore.userData);

  return (
    <Observer>
      {() => (
        <>
          <AppContainer>
            <Header title={AppStrings.nutritionEducationLabel} />
            <KeyboardAvoidingView
              behavior={Platform.select({ios: 'padding'})}
              style={styles.keyboardAwoidStyle}>
              <View style={styles.backgroundStyle}>
                <ScrollView
                  contentContainerStyle={styles.contentContainerStyle}>
                  <Pressable>
                    <View style={styles.container}>
                      <Text style={styles.headingText}>
                        {AppStrings.NUTRITION_EDUCATION_SCREEN.nutritionTitle}
                      </Text>

                      <AppTextInput
                        parentStyle={styles.dovInputStyle}
                        textHeader={
                          AppStrings.NUTRITION_EDUCATION_SCREEN
                            .dateOfVisitPlaceHolder
                        }
                        rightIcon={AppSVGs.dob}
                        placeHolder={
                          AppStrings.NUTRITION_EDUCATION_SCREEN
                            .dateOfVisitPlaceHolder
                        }
                        hideInput={true}
                        onPress={showDatePicker}
                        otherText={cdStore.dov}
                        errorMessage={cdStore.errorMessages.dov}
                        isMandatory
                      />

                      <AppToggle
                        title={AppStrings.partnerDetails}
                        children={
                          <>
                            <AppInput
                              onPress={() => {
                                handleBottomSheetClick('partner');
                                handleIndex(1);
                              }}
                              parentStyle={styles.textInputStyle}
                              value={cdStore.partner}
                              textHeader={
                                AppStrings.newExistingPartnerPlaceHolder
                              }
                              placeHolder={
                                AppStrings.newExistingPartnerPlaceHolder
                              }
                              rightIcon={AppSVGs.dropdown}
                              errorMessage={cdStore.errorMessages.partner}
                              isMandatory
                            />

                            {cdStore.partner === 'New' ? (
                              <>
                                <AppTextInput
                                  value={cdStore.newPartnerName}
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.partnerNamePlaceHolder}
                                  placeHolder={
                                    AppStrings.partnerNamePlaceHolder
                                  }
                                  onChangeText={cdStore.setNewPartnerName}
                                  errorMessage={
                                    cdStore.errorMessages.newPartnerName
                                  }
                                  isMandatory
                                />

                                <AppTextInput
                                  value={cdStore.newLocation}
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.locationPlaceHolder}
                                  placeHolder={AppStrings.locationPlaceHolder}
                                  onChangeText={cdStore.setNewLocation}
                                  errorMessage={
                                    cdStore.errorMessages.newLocation
                                  }
                                />

                                <AppTextInput
                                  value={cdStore.newBlock}
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.blockPlaceHolder}
                                  placeHolder={AppStrings.blockPlaceHolder}
                                  onChangeText={cdStore.setNewBlock}
                                  errorMessage={cdStore.errorMessages.newBlock}
                                  isMandatory
                                />

                                <AppTextInput
                                  value={cdStore.newDistrict}
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.districtPlaceHolder}
                                  placeHolder={AppStrings.districtPlaceHolder}
                                  onChangeText={cdStore.setNewDistrict}
                                  errorMessage={
                                    cdStore.errorMessages.newDistrict
                                  }
                                  isMandatory
                                />

                                <AppTextInput
                                  value={cdStore.newState}
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.statePlaceHolder}
                                  placeHolder={AppStrings.statePlaceHolder}
                                  onChangeText={cdStore.setNewState}
                                  errorMessage={cdStore.errorMessages.newState}
                                  isMandatory
                                />
                              </>
                            ) : cdStore.partner === 'Existing' ? (
                              <>
                                <AppInput
                                  onPress={() => {
                                    handleBottomSheetClick('partnerName');
                                    handleIndex(3);
                                  }}
                                  parentStyle={styles.textInputStyle}
                                  value={cdStore.existPartnerName}
                                  textHeader={AppStrings.partnerNamePlaceHolder}
                                  placeHolder={
                                    AppStrings.partnerNamePlaceHolder
                                  }
                                  rightIcon={AppSVGs.dropdown}
                                  errorMessage={cdStore.errorMessages.partnerID}
                                  isMandatory
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.locationPlaceHolder}
                                  placeHolder={AppStrings.locationPlaceHolder}
                                  value={cdStore.existLocation}
                                  //onChangeText={cdStore.setLocation}
                                  editable={false}
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.blockPlaceHolder}
                                  placeHolder={AppStrings.blockPlaceHolder}
                                  value={cdStore.existBlock}
                                  editable={false}
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.districtPlaceHolder}
                                  placeHolder={AppStrings.districtPlaceHolder}
                                  value={cdStore.existDistrict}
                                  editable={false}
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.statePlaceHolder}
                                  placeHolder={AppStrings.statePlaceHolder}
                                  value={cdStore.existState}
                                  editable={false}
                                />
                              </>
                            ) : null}
                          </>
                        }
                      />

                      <AppDashedLine />

                      <AppToggle
                        title={
                          AppStrings.NUTRITION_EDUCATION_SCREEN.programDetails
                        }
                        children={
                          <>
                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .totalParticipantsPlaceHolder
                              }
                              placeHolder={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .totalParticipantsPlaceHolder
                              }
                              onChangeText={cdStore.setTotalNoOfParticipants}
                              value={cdStore.totalNoOfParticipants}
                              keyboardType={'numeric'}
                              errorMessage={
                                cdStore.errorMessages.totalNoOfParticipants
                              }
                              isMandatory
                            />

                            <AppInput
                              onPress={() => {
                                handleBottomSheetClick('beneficiaries');
                                handleIndex(3);
                              }}
                              parentStyle={styles.textInputStyle}
                              value={cdStore.targetBeneficiaries}
                              textHeader={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .targetBeneficiariesPlaceHolder
                              }
                              placeHolder={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .targetBeneficiariesPlaceHolder
                              }
                              rightIcon={AppSVGs.dropdown}
                              errorMessage={
                                cdStore.errorMessages.beneficiarieID
                              }
                              isMandatory
                            />

                            <AppInput
                              onPress={() => {
                                handleBottomSheetClick('age');
                                handleIndex(3);
                              }}
                              parentStyle={styles.textInputStyle}
                              value={cdStore.age}
                              textHeader={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .agePlaceHolder
                              }
                              placeHolder={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .agePlaceHolder
                              }
                              rightIcon={AppSVGs.dropdown}
                              errorMessage={cdStore.errorMessages.ageID}
                              isMandatory
                            />

                            <View style={styles.hourContainer}>
                              <View style={styles.hourMinute}>
                                <AppInput
                                  textHeader={
                                    AppStrings.NUTRITION_EDUCATION_SCREEN
                                      .programDuration
                                  }
                                  placeHolder={AppStrings.hourPlaceHolder}
                                  value={cdStore.hour}
                                  parentStyle={styles.textInputStyle}
                                  onPress={() => {
                                    handleBottomSheetClick('hour');
                                    handleIndex(3);
                                  }}
                                  rightIcon={AppSVGs.dropdown}
                                  errorMessage={cdStore.errorMessages.hour}
                                  isMandatory
                                />
                              </View>
                              <View style={styles.hourMinute}>
                                <AppInput
                                  textHeader=" "
                                  placeHolder={AppStrings.minutePlaceHolder}
                                  value={cdStore.minute}
                                  parentStyle={styles.textInputStyle}
                                  onPress={() => {
                                    handleBottomSheetClick('minute');
                                    handleIndex(3);
                                  }}
                                  rightIcon={AppSVGs.dropdown}
                                  errorMessage={cdStore.errorMessages.minute}
                                />
                              </View>
                            </View>
                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .methodUsedPlaceHolder
                              }
                              placeHolder={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .methodUsedPlaceHolder
                              }
                              onChangeText={cdStore.setMethodUsed}
                              errorMessage={cdStore.errorMessages.methodUsed}
                              isMandatory
                            />
                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .topicsCoveredPlaceHolder
                              }
                              placeHolder={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .topicsCoveredPlaceHolder
                              }
                              onChangeText={cdStore.setTopicsCovered}
                              errorMessage={cdStore.errorMessages.topicsCovered}
                              isMandatory
                            />

                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .sessionConductedPlaceHolder
                              }
                              placeHolder={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .sessionConductedPlaceHolder
                              }
                              onChangeText={cdStore.setSessionCoveredBy}
                              errorMessage={
                                cdStore.errorMessages.sessionConductedBy
                              }
                              isMandatory
                            />
                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .feedbackParticipantsPlaceHolder
                              }
                              placeHolder={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .feedbackParticipantsPlaceHolder
                              }
                              onChangeText={cdStore.setFeedbackFromParticipants}
                              errorMessage={
                                cdStore.errorMessages.feedbackFromParticipants
                              }
                              isMandatory
                            />

                            <AppImageUploadInput
                              title={AppStrings.uploadPhoto}
                              selectedImages={selectedImages}
                              onPress={cdStore.togglePhotoBottomSheet}
                              removeImage={removeImage}
                              errorMessage={
                                cdStore.errorMessages.selectedImages
                              }
                            />
                          </>
                        }
                      />
                    </View>
                  </Pressable>
                </ScrollView>

                <AppButton
                  title={AppStrings.submit}
                  style={styles.buttonStyle}
                  width={'90%'}
                  isLoading={cdStore.isLoading}
                  onPress={() => {
                    cdStore.setSelectedImages(selectedImages);
                    cdStore.saveData();
                  }}
                  enabled={true}
                />
              </View>
            </KeyboardAvoidingView>
          </AppContainer>

          <AppBottomSheet
            isVisible={cdStore.openBottomSheet}
            onClose={hideBottomSheet}
            index={cdStore.index}
            ref={bottomSheetRef}>
            <AppBottomSheetDropdown
              search={cdStore.showSearchBar}
              header={cdStore.bottomSheetHeader}
              data={cdStore.bottomSheetArray}
              onClose={() => {
                bottomSheetRef?.current?.close();
                cdStore.toggleBottomSheet();
                cdStore.setShowSearchBar(false);
              }}
              onItemSelect={cdStore.setValue}
              onPress={() => {
                cdStore.toggleBottomSheet();
                cdStore.setShowSearchBar(false);
              }}
            />
          </AppBottomSheet>

          <DatePicker
            modal
            mode="date"
            date={new Date()}
            open={cdStore.showCalender}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date()}
          />

          <AppBottomSheet
            isVisible={cdStore.openPhotoBottomSheet}
            onClose={cdStore.togglePhotoBottomSheet}
            index={cdStore.index}
            ref={bottomSheetRef}>
            <View>
              <View style={styles.headerContainer}>
                <Text style={styles.headerStyle}>{AppStrings.uploadPhoto}</Text>
                <TouchableOpacity onPress={cdStore.togglePhotoBottomSheet}>
                  <AppSVGs.close />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.photoContainerStyle}
                onPress={() => {
                  handleImagePicker(1);
                }}>
                <Text>{AppStrings.takePhoto}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.photoContainerStyle}
                onPress={() => {
                  handleImagePicker(2);
                }}>
                <Text>{AppStrings.uploadLibrary}</Text>
              </TouchableOpacity>
            </View>
          </AppBottomSheet>
        </>
      )}
    </Observer>
  );
};

export default CaptureDetailsScreen;
