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
import DashedLine from 'react-native-dashed-line';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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
    cdStore.validateSubmit();
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
                          AppStrings.NUTRITION_EDUCATION_SCREEN.dateOfVisit
                        }
                        rightIcon={AppSVGs.dob}
                        placeHolder={
                          AppStrings.NUTRITION_EDUCATION_SCREEN
                            .dateOfVisitPlaceHolder
                        }
                        hideInput={true}
                        onPress={showDatePicker}
                        otherText={cdStore.dov}
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
                              textHeader={AppStrings.newExistingPartner}
                              placeHolder={
                                AppStrings.newExistingPartnerPlaceHolder
                              }
                              rightIcon={AppSVGs.dropdown}
                            />

                            {cdStore.partner === 'New' ? (
                              <>
                                <AppTextInput
                                  value={cdStore.newPartnerName}
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.partnerName}
                                  placeHolder={
                                    AppStrings.partnerNamePlaceHolder
                                  }
                                  onChangeText={cdStore.setNewPartnerName}
                                />

                                <AppTextInput
                                  value={cdStore.newLocation}
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.location}
                                  placeHolder={AppStrings.locationPlaceHolder}
                                  onChangeText={cdStore.setNewLocation}
                                />

                                <AppTextInput
                                  value={cdStore.newBlock}
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.block}
                                  placeHolder={AppStrings.blockPlaceHolder}
                                  onChangeText={cdStore.setNewBlock}
                                />

                                <AppTextInput
                                  value={cdStore.newDistrict}
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.district}
                                  placeHolder={AppStrings.districtPlaceHolder}
                                  onChangeText={cdStore.setNewDistrict}
                                />

                                <AppTextInput
                                  value={cdStore.newState}
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.state}
                                  placeHolder={AppStrings.statePlaceHolder}
                                  onChangeText={cdStore.setNewState}
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
                                  textHeader={AppStrings.partnerName}
                                  placeHolder={
                                    AppStrings.partnerNamePlaceHolder
                                  }
                                  rightIcon={AppSVGs.dropdown}
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.location}
                                  placeHolder={AppStrings.locationPlaceHolder}
                                  value={cdStore.existLocation}
                                  //onChangeText={cdStore.setLocation}
                                  editable={false}
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.block}
                                  placeHolder={AppStrings.blockPlaceHolder}
                                  value={cdStore.existBlock}
                                  editable={false}
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.district}
                                  placeHolder={AppStrings.districtPlaceHolder}
                                  value={cdStore.existDistrict}
                                  editable={false}
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.state}
                                  placeHolder={AppStrings.statePlaceHolder}
                                  value={cdStore.existState}
                                  editable={false}
                                />
                              </>
                            ) : null}
                          </>
                        }
                      />

                      <DashedLine
                        dashLength={5}
                        dashThickness={0.7}
                        dashColor={colors.gray}
                      />

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
                                  .totalParticipants
                              }
                              placeHolder={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .totalParticipantsPlaceHolder
                              }
                              onChangeText={cdStore.setTotalNoOfParticipants}
                              value={cdStore.totalNoOfParticipants}
                              keyboardType={'numeric'}
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
                                  .targetBeneficiaries
                              }
                              placeHolder={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .targetBeneficiariesPlaceHolder
                              }
                              rightIcon={AppSVGs.dropdown}
                            />

                            <AppInput
                              onPress={() => {
                                handleBottomSheetClick('age');
                                handleIndex(3);
                              }}
                              parentStyle={styles.textInputStyle}
                              value={cdStore.age}
                              textHeader={
                                AppStrings.NUTRITION_EDUCATION_SCREEN.age
                              }
                              placeHolder={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .agePlaceHolder
                              }
                              rightIcon={AppSVGs.dropdown}
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
                                />
                              </View>
                            </View>
                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader={
                                AppStrings.NUTRITION_EDUCATION_SCREEN.methodUsed
                              }
                              placeHolder={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .methodUsedPlaceHolder
                              }
                              onChangeText={cdStore.setMethodUsed}
                            />
                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .topicsCovered
                              }
                              placeHolder={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .topicsCoveredPlaceHolder
                              }
                              onChangeText={cdStore.setTopicsCovered}
                            />

                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .sessionConducted
                              }
                              placeHolder={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .sessionConductedPlaceHolder
                              }
                              onChangeText={cdStore.setSessionCoveredBy}
                            />
                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .feedbackParticipants
                              }
                              placeHolder={
                                AppStrings.NUTRITION_EDUCATION_SCREEN
                                  .feedbackParticipantsPlaceHolder
                              }
                              onChangeText={cdStore.setFeedbackFromParticipants}
                            />

                            <AppImageUploadInput
                              title={AppStrings.uploadPhotoCaps}
                              selectedImages={selectedImages}
                              onPress={cdStore.togglePhotoBottomSheet}
                              removeImage={removeImage}
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
                  enabled={cdStore.enableSubmit}
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
              header={cdStore.bottomSheetHeader}
              data={cdStore.bottomSheetArray}
              onClose={() => {
                bottomSheetRef?.current?.close();
                cdStore.toggleBottomSheet();
              }}
              onItemSelect={cdStore.setValue}
              onPress={cdStore.toggleBottomSheet}
            />
          </AppBottomSheet>

          <DateTimePickerModal
            isVisible={cdStore.showCalender}
            mode="date"
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
