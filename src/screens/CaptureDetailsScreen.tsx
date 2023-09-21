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
  TouchableOpacity,
  View,
} from 'react-native';
import DashedLine from 'react-native-dashed-line';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {AppSVGs} from '../assets';
import {
  AppButton,
  AppContainer,
  AppTextInput,
  AppBottomSheet,
  AppBottomSheetDropdown,
  AppImageUploadInput,
  AppInput,
  AppToggle,
  Header,
} from '../components';
import {useCamera} from '../custom_hooks';
import {authStore} from '../stores';
import {useCaptureDetailsStore} from '../stores';
import {colors} from '../theme';
import Utility from '../utils/Utility';
import {styles} from '../styles/formStyles';

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
            <Header title={'Nutrition Education'} />
            <KeyboardAvoidingView
              behavior={Platform.select({ios: 'padding'})}
              style={styles.keyboardAwoidStyle}>
              <View style={styles.backgroundStyle}>
                <ScrollView
                  contentContainerStyle={styles.contentContainerStyle}>
                  <Pressable>
                    <View style={styles.container}>
                      <Text style={styles.headingText}>
                        Enter details related to the Nutrition Education event
                      </Text>

                      <AppTextInput
                        parentStyle={styles.dovInputStyle}
                        textHeader="DATE OF VISIT"
                        rightIcon={AppSVGs.dob}
                        placeHolder="Date Of Visit"
                        hideInput={true}
                        onPress={showDatePicker}
                        otherText={cdStore.dov}
                      />

                      <AppToggle
                        title={'Partner Details'}
                        children={
                          <>
                            <AppInput
                              onPress={() => {
                                handleBottomSheetClick('partner');
                                handleIndex(1);
                              }}
                              parentStyle={styles.textInputStyle}
                              value={cdStore.partner}
                              textHeader="IS THIS A NEW / EXISTING PARTNER"
                              placeHolder="Is this a New / Existing Partner"
                              rightIcon={AppSVGs.dropdown}
                            />

                            {cdStore.partner === 'New' ? (
                              <>
                                <AppTextInput
                                  value={cdStore.newPartnerName}
                                  parentStyle={styles.textInputStyle}
                                  textHeader="NAME OF THE PARTNER"
                                  placeHolder="Name of the partner"
                                  onChangeText={cdStore.setNewPartnerName}
                                />

                                <AppTextInput
                                  value={cdStore.newLocation}
                                  parentStyle={styles.textInputStyle}
                                  textHeader="LOCATION"
                                  placeHolder="Location"
                                  onChangeText={cdStore.setNewLocation}
                                />

                                <AppTextInput
                                  value={cdStore.newBlock}
                                  parentStyle={styles.textInputStyle}
                                  textHeader="BLOCK"
                                  placeHolder="Block"
                                  onChangeText={cdStore.setNewBlock}
                                />

                                <AppTextInput
                                  value={cdStore.newDistrict}
                                  parentStyle={styles.textInputStyle}
                                  textHeader="DISTRICT"
                                  placeHolder="District"
                                  onChangeText={cdStore.setNewDistrict}
                                />

                                <AppTextInput
                                  value={cdStore.newState}
                                  parentStyle={styles.textInputStyle}
                                  textHeader="STATE"
                                  placeHolder="State"
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
                                  textHeader="NAME OF THE PARTNER"
                                  placeHolder="Name of the partner"
                                  rightIcon={AppSVGs.dropdown}
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader="LOCATION"
                                  placeHolder="Location"
                                  value={cdStore.existLocation}
                                  //onChangeText={cdStore.setLocation}
                                  editable={false}
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader="BLOCK"
                                  placeHolder="Block"
                                  value={cdStore.existBlock}
                                  editable={false}
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader="DISTRICT"
                                  placeHolder="District"
                                  value={cdStore.existDistrict}
                                  editable={false}
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader="STATE"
                                  placeHolder="State"
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
                        title={'Program Details'}
                        children={
                          <>
                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader="TOTAL NUMBER OF PARTICIPANTS"
                              placeHolder="Total number of participants"
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
                              textHeader="TARGET BENEFICIARIES"
                              placeHolder="Target beneficiaries"
                              rightIcon={AppSVGs.dropdown}
                            />

                            <AppInput
                              onPress={() => {
                                handleBottomSheetClick('age');
                                handleIndex(3);
                              }}
                              parentStyle={styles.textInputStyle}
                              value={cdStore.age}
                              textHeader="AGE"
                              placeHolder="Age"
                              rightIcon={AppSVGs.dropdown}
                            />

                            <View style={styles.hourContainer}>
                              <View style={styles.hourMinute}>
                                <AppInput
                                  textHeader="PROGRAM DURATION"
                                  placeHolder="Hour"
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
                                  placeHolder="Minute"
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
                              textHeader="METHOD USED"
                              placeHolder="Method used"
                              onChangeText={cdStore.setMethodUsed}
                            />
                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader="TOPICS COVERED"
                              placeHolder="Topics covered"
                              onChangeText={cdStore.setTopicsCovered}
                            />

                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader="SESSION CONDUCTED BY"
                              placeHolder="Session conducted by"
                              onChangeText={cdStore.setSessionCoveredBy}
                            />
                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader="FEEDBACK FROM PARTICIPANTS"
                              placeHolder="Feedback from participants"
                              onChangeText={cdStore.setFeedbackFromParticipants}
                            />

                            <AppImageUploadInput
                              title={'UPLOAD PHOTO'}
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
                  title="Submit"
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
                <Text style={styles.headerStyle}>Upload Photo</Text>
                <TouchableOpacity onPress={cdStore.togglePhotoBottomSheet}>
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

export default CaptureDetailsScreen;
