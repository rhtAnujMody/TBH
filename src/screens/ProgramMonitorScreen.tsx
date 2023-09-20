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
import {
  AppButton,
  AppContainer,
  AppTextInput,
  AppBottomSheet,
  AppBottomSheetDropdown,
  AppInput,
  AppToggle,
  Header,
  AppImageUploadInput,
} from '../components';

import DashedLine from 'react-native-dashed-line';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {useCamera} from '../custom_hooks';
import useProgramStore from '../stores/useProgramStore';
import {colors, typography} from '../theme';
import Utility from '../utils/Utility';
import {AppSVGs} from '../assets';
import {styles} from '../styles/formStyles';

const ProgramMonitorScreen = () => {
  const proStore = useProgramStore();

  const bottomSheetRef = useRef<BottomSheet | null>(null);

  const {openGallery, takePhotoFromCamera, selectedImages, removeImage} =
    useCamera();

  const handleImagePicker = (from: number) => {
    proStore.togglePhotoBottomSheet();
    if (from === 1) {
      takePhotoFromCamera();
    } else {
      openGallery();
    }
  };

  const handleBottomSheetClick = (from: string) => {
    proStore.toggleBottomSheet(from);
  };
  const hideBottomSheet = () => {
    proStore.toggleBottomSheet();
  };
  const handleIndex = (value: number) => {
    proStore.setIndex(value);
  };

  const showDatePicker = (id: string) => {
    proStore.setCalenderID(id);
    proStore.toogleCalender();
  };

  const handleConfirm = (date: Date) => {
    switch (proStore.calenderID) {
      case '1':
        proStore.setDOV(Utility.formatDate(date));
        break;
      case '2':
        proStore.setFoodSupplyDate(Utility.formatDate(date));
        break;
    }
    proStore.toogleCalender();
  };

  return (
    <Observer>
      {() => (
        <>
          <AppContainer>
            <Header title={'Program Monitoring'} />
            <KeyboardAvoidingView
              behavior={Platform.select({ios: 'padding'})}
              style={styles.keyboardAwoidStyle}>
              <View style={styles.backgroundStyle}>
                <ScrollView
                  contentContainerStyle={styles.contentContainerStyle}>
                  <Pressable style={styles.container}>
                    <Text style={styles.headingText}>
                      Enter details related to the Program Monitoring event
                    </Text>
                    <AppToggle
                      title={'Partner Info'}
                      children={
                        <>
                          <AppInput
                            onPress={() => {
                              handleBottomSheetClick('partnerType');
                              handleIndex(2);
                            }}
                            parentStyle={styles.textInputStyle}
                            value={proStore.partnerType}
                            textHeader="PARTNER TYPE"
                            placeHolder="Please Select"
                            rightIcon={AppSVGs.dropdown}
                          />

                          <AppInput
                            onPress={() => {
                              handleBottomSheetClick('existingPartner');
                              handleIndex(3);
                            }}
                            parentStyle={styles.textInputStyle}
                            value={proStore.existingPartner}
                            textHeader="NAME AND LOCATION OF EXISTING PARTNER"
                            placeHolder="Please Select"
                            rightIcon={AppSVGs.dropdown}
                          />

                          {proStore.existingPartner && (
                            <>
                              <AppTextInput
                                parentStyle={styles.textInputStyle}
                                textHeader="LOCATION"
                                placeHolder="Location"
                                value={proStore.existLocation}
                                //onChangeText={cdStore.setLocation}
                                editable={false}
                              />

                              <AppTextInput
                                parentStyle={styles.textInputStyle}
                                textHeader="BLOCK"
                                placeHolder="Block"
                                value={proStore.existBlock}
                                editable={false}
                              />

                              <AppTextInput
                                parentStyle={styles.textInputStyle}
                                textHeader="District"
                                placeHolder="District"
                                value={proStore.existDistrict}
                                editable={false}
                              />

                              <AppTextInput
                                parentStyle={styles.textInputStyle}
                                textHeader="STATE"
                                placeHolder="State"
                                value={proStore.existState}
                                editable={false}
                              />
                            </>
                          )}

                          <AppTextInput
                            parentStyle={styles.dovInputStyle}
                            textHeader="Date Of Visit for Monitoring"
                            rightIcon={AppSVGs.dob}
                            placeHolder="Please Select"
                            hideInput={true}
                            onPress={() => {
                              showDatePicker('1');
                            }}
                            otherText={proStore.dov}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Visiting team size (staff/volunteers)"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setVVTeamSize}
                            value={proStore.vvTeamSize}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Name of Decimal Staff Partner liaison for the visit"
                            placeHolder="Please Enter the details"
                            value={proStore.liaDNameStaff}
                            onChangeText={proStore.setLiaDNameStaff}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Designation of Decimal Staff Partner liaison for the visit"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setLiaDDesigStaff}
                            value={proStore.liaDDesigStaff}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Name of Partner's Staff Partner liaison for the visit"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setLiaPNameStaff}
                            value={proStore.liaPNameStaff}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Designation of Partner's Staff Partner liaison for the visit"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setLiaPDesigStaff}
                            value={proStore.liaPDesigStaff}
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
                      title={'Program Compliance'}
                      children={
                        <>
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Number of children present on the day of visit"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setNumberOfChildrenDOV}
                            keyboardType="numeric"
                            value={proStore.numberOfChildrenDOV}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Avg. class/school attendance  for the month"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setAvgAttendMonth}
                            keyboardType="numeric"
                            value={proStore.averageAttendMonth}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Number of new children enrolled into the program"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setNumNewChildEnroll}
                            keyboardType="numeric"
                            value={proStore.numNewChildEnroll}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Number of children who have dropped out of the program"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setNumChildDropped}
                            keyboardType="numeric"
                            value={proStore.numChildDropped}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Number of children who are sick around the day of visit."
                            placeHolder="Please Enter the details"
                            value={proStore.numChildSick}
                            onChangeText={proStore.setNumChildSick}
                            keyboardType="numeric"
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="What is the illness?"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setIllness}
                            value={proStore.illness}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Which numbered activity sheet was received this month?"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setNumberedActivitySheet}
                            value={proStore.numberedActivitySheet}
                          />

                          <AppInput
                            onPress={() => {
                              handleBottomSheetClick('activitySheet');
                              handleIndex(1);
                            }}
                            parentStyle={styles.textInputStyle}
                            value={proStore.activitySheetCompleted}
                            textHeader="Have the children completed the activity sheet for this month?"
                            placeHolder="Please Select"
                            rightIcon={AppSVGs.dropdown}
                          />

                          <AppInput
                            onPress={() => {
                              handleBottomSheetClick('poshanCalendar');
                              handleIndex(1);
                            }}
                            parentStyle={styles.textInputStyle}
                            value={proStore.poshanCalenderCompleted}
                            textHeader="Are the teachers/social workers completing the Poshan Calendar properly?"
                            placeHolder="Please Select"
                            rightIcon={AppSVGs.dropdown}
                          />

                          <AppTextInput
                            parentStyle={styles.dovInputStyle}
                            textHeader="Date when the month's food supply was received"
                            rightIcon={AppSVGs.dob}
                            placeHolder="Please Enter the details"
                            hideInput={true}
                            onPress={() => {
                              showDatePicker('2');
                            }}
                            otherText={proStore.foodSupplyDate}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Number of meals carried forward from the previous month"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setNoOfMealsCF}
                            keyboardType="numeric"
                            value={proStore.noOfMealsCF}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Number of meals received this month"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setNoOfMealsReceive}
                            keyboardType="numeric"
                            value={proStore.noOfMealsReceive}
                          />

                          <AppInput
                            onPress={() => {
                              handleBottomSheetClick('storedFoodSafely');
                              handleIndex(1);
                            }}
                            parentStyle={styles.textInputStyle}
                            value={proStore.storedFoodSafely}
                            textHeader="Has the partner stored the food safely?"
                            placeHolder="Please Select"
                            rightIcon={AppSVGs.dropdown}
                          />

                          <AppInput
                            onPress={() => {
                              handleBottomSheetClick('breakfastServedDaily');
                              handleIndex(1);
                            }}
                            parentStyle={styles.textInputStyle}
                            value={proStore.breakfastServedDaily}
                            textHeader="Is the breakfast being served daily?"
                            placeHolder="Please Select"
                            rightIcon={AppSVGs.dropdown}
                          />

                          <AppInput
                            onPress={() => {
                              handleBottomSheetClick('whenBreakfast');
                              handleIndex(2);
                            }}
                            parentStyle={styles.textInputStyle}
                            value={proStore.whenBreakfast}
                            textHeader="When is breakfast usually served? (observed by Decimal staff)"
                            placeHolder="Please Select"
                            rightIcon={AppSVGs.dropdown}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Additional observations or points discussed"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setAddObservations}
                            value={proStore.addObservations}
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
                      title={'Beneficiary Follow Up'}
                      children={
                        <>
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Feedback from a teacher/social worker about highlighted children, program issues, positive feedback"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setTeacherFeedback}
                            value={proStore.teacherFeedback}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Feedback from parents (if available)"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setParentFeedback}
                            value={proStore.parentFeedback}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Feedback from the children (food tastes, thoughts, activity sheets etc)"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setChildFeedback}
                            value={proStore.childFeedback}
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
                      title={'Volunteers Info'}
                      children={
                        <>
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Company name"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setCompanyName}
                            value={proStore.companyName}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Name of volunteer(s)"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setVolunteerName}
                            value={proStore.volunteerName}
                          />

                          <View style={styles.hourContainer}>
                            <View style={styles.hourMinStyle}>
                              <AppInput
                                textHeader="Duration of the volunteer session"
                                placeHolder="Hour"
                                value={proStore.volunteerHour}
                                parentStyle={styles.textInputStyle}
                                onPress={() => {
                                  handleBottomSheetClick('volunteerHour');
                                  handleIndex(3);
                                }}
                                rightIcon={AppSVGs.dropdown}
                              />
                            </View>
                            <View style={styles.hourMinStyle}>
                              <AppInput
                                textHeader={'\n'}
                                placeHolder="Minute"
                                value={proStore.volunteerMinute}
                                parentStyle={styles.textInputStyle}
                                onPress={() => {
                                  handleBottomSheetClick('volunteerMinute');
                                  handleIndex(3);
                                }}
                                rightIcon={AppSVGs.dropdown}
                              />
                            </View>
                          </View>

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Reason/objective for the volunteering session with Decimal"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setVolunteerReason}
                            value={proStore.volunteerReason}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Any major learning(s)  and/or observations "
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setLearnAndObserve}
                            value={proStore.learnAndObserve}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Any other feedback"
                            placeHolder="Please Enter the details"
                            onChangeText={proStore.setOtherFeedback}
                            value={proStore.otherFeedback}
                          />
                        </>
                      }
                    />
                    <DashedLine
                      dashLength={5}
                      dashThickness={0.7}
                      dashColor={colors.gray}
                    />

                    <View style={styles.hourContainer}>
                      <View style={styles.hourMinStyle}>
                        <AppInput
                          textHeader="Duration of Visit for"
                          placeHolder="Hour"
                          value={proStore.hour}
                          parentStyle={styles.textInputStyle}
                          onPress={() => {
                            handleBottomSheetClick('hour');
                            handleIndex(3);
                          }}
                          rightIcon={AppSVGs.dropdown}
                        />
                      </View>
                      <View style={styles.hourMinStyle}>
                        <AppInput
                          textHeader=" "
                          placeHolder="Minute"
                          value={proStore.minute}
                          parentStyle={styles.textInputStyle}
                          onPress={() => {
                            handleBottomSheetClick('minute');
                            handleIndex(3);
                          }}
                          rightIcon={AppSVGs.dropdown}
                        />
                      </View>
                    </View>
                    <DashedLine
                      dashLength={5}
                      dashThickness={0.7}
                      dashColor={colors.gray}
                    />

                    <AppImageUploadInput
                      title={'Photos for Monitoring'}
                      selectedImages={selectedImages}
                      onPress={proStore.togglePhotoBottomSheet}
                      removeImage={removeImage}
                    />
                  </Pressable>
                </ScrollView>

                <AppButton
                  title="Submit"
                  style={styles.buttonStyle}
                  width={'90%'}
                  isLoading={proStore.isLoading}
                  onPress={() => {
                    proStore.setSelectedImages(selectedImages);
                    proStore.sendData();
                  }}
                  enabled={proStore.enableSubmit}
                />
              </View>
            </KeyboardAvoidingView>
          </AppContainer>

          <DateTimePickerModal
            isVisible={proStore.showCalender}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={proStore.toogleCalender}
            maximumDate={new Date()}
          />

          <AppBottomSheet
            isVisible={proStore.openBottomSheet}
            onClose={hideBottomSheet}
            index={proStore.index}
            ref={bottomSheetRef}>
            <AppBottomSheetDropdown
              header={proStore.bottomSheetHeader}
              data={proStore.bottomSheetArray}
              onClose={() => {
                bottomSheetRef?.current?.close();
                proStore.toggleBottomSheet();
              }}
              onItemSelect={proStore.setValue}
              onPress={proStore.toggleBottomSheet}
            />
          </AppBottomSheet>

          <AppBottomSheet
            isVisible={proStore.openPhotoBottomSheet}
            onClose={proStore.togglePhotoBottomSheet}
            index={proStore.index}
            ref={bottomSheetRef}>
            <View>
              <View style={styles.headerContainer}>
                <Text style={styles.headerStyle}>Upload Photo</Text>
                <TouchableOpacity onPress={proStore.togglePhotoBottomSheet}>
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

export default ProgramMonitorScreen;
