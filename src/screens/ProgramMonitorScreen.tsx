import BottomSheet from '@gorhom/bottom-sheet/';
import {Observer} from 'mobx-react-lite';
import React, {useRef} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DashedLine from 'react-native-dashed-line';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {AppSVGs} from '../assets';
import {AppButton, AppContainer, AppTextInput} from '../components';
import AppBottomSheet from '../components/common/AppBottomSheet';
import {AppBottomSheetDropdown} from '../components/common/AppBottomSheetDropdown';
import AppImageUploadInput from '../components/common/AppImageUploadInput';
import AppInput from '../components/common/AppInput';
import AppToggle from '../components/common/AppToggle';
import Header from '../components/common/Header';
import useCamera from '../custom_hooks/useCamera';
import useProgramStore from '../stores/useProgramStore';
import {colors, typography} from '../theme';
import Utility from '../utils/Utility';

const ProgramMonitorScreen = () => {
  const proStore = useProgramStore();

  const bottomSheetRef = useRef<BottomSheet | null>(null);

  const {openGallery, removeImage, takePhotoFromCamera, selectedImages} =
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
              style={styles.keyboardAvoidStyle}>
              <View style={styles.backgroundStyle}>
                <ScrollView
                  contentContainerStyle={styles.contentContainerStyle}>
                  <View style={styles.container}>
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
                            placeHolder="Partner Type"
                            rightIcon={AppSVGs.dropdown}
                          />

                          <AppInput
                            onPress={() => {
                              handleBottomSheetClick('existingPartner');
                              handleIndex(2);
                            }}
                            parentStyle={styles.textInputStyle}
                            value={proStore.existingPartner}
                            textHeader="NAME AND LOCATION OF EXISTING PARTNER"
                            placeHolder="Name and Location of existing partner"
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
                            textHeader="DATE OF VISIT"
                            rightIcon={AppSVGs.dob}
                            placeHolder="Date Of Visit for Monitoring"
                            hideInput={true}
                            onPress={() => {
                              showDatePicker('1');
                            }}
                            otherText={proStore.dov}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Visiting team size (staff/volunteers)"
                            placeHolder="Visiting team size (staff/volunteers)"
                            onChangeText={proStore.setVVTeamSize}
                            keyboardType="numeric"
                            value={proStore.vvTeamSize}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Partner liaison for the visit"
                            placeHolder="Name of decimal staff"
                            value={proStore.liaDNameStaff}
                            onChangeText={proStore.setLiaDNameStaff}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Partner liaison for the visit"
                            placeHolder="Designation of decimal staff"
                            onChangeText={proStore.setLiaDDesigStaff}
                            value={proStore.liaDDesigStaff}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Partner liaison for the visit"
                            placeHolder="Name of Partner's staff"
                            onChangeText={proStore.setLiaPNameStaff}
                            value={proStore.liaPNameStaff}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Partner liaison for the visit"
                            placeHolder="Designation of Partner's staff"
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
                            placeHolder="Number of children present on the day of visit"
                            onChangeText={proStore.setNumberOfChildrenDOV}
                            keyboardType="numeric"
                            value={proStore.numberOfChildrenDOV}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Avg. class/school attendance  for the month"
                            placeHolder="Avg. class/school attendance  for the month"
                            onChangeText={proStore.setAvgAttendMonth}
                            value={proStore.averageAttendMonth}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Number of new children enrolled into the program"
                            placeHolder="Number of new children enrolled into the program"
                            onChangeText={proStore.setNumNewChildEnroll}
                            keyboardType="numeric"
                            value={proStore.numNewChildEnroll}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Number of children who have dropped out of the program"
                            placeHolder="Number of children who have dropped out of the program"
                            onChangeText={proStore.setNumChildDropped}
                            keyboardType="numeric"
                            value={proStore.numChildDropped}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Number of children who are sick around the day of visit."
                            placeHolder="Number of children who are sick around the day of visit."
                            value={proStore.numChildSick}
                            onChangeText={proStore.setNumChildSick}
                            keyboardType="numeric"
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="What is the illness?"
                            placeHolder="What is the illness?"
                            onChangeText={proStore.setIllness}
                            value={proStore.illness}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Which numbered activity sheet was received this month?"
                            placeHolder="Which numbered activity sheet was received this month?"
                            onChangeText={proStore.setNumberedActivitySheet}
                            value={proStore.numberedActivitySheet}
                            keyboardType="numeric"
                          />

                          <AppInput
                            onPress={() => {
                              handleBottomSheetClick('activitySheet');
                              handleIndex(1);
                            }}
                            parentStyle={styles.textInputStyle}
                            value={proStore.activitySheetCompleted}
                            textHeader="Have the children completed the activity sheet for this month?"
                            placeHolder="Have the children completed the activity sheet for this month?"
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
                            placeHolder="Are the teachers/social workers completing the Poshan Calendar properly?"
                            rightIcon={AppSVGs.dropdown}
                          />

                          <AppTextInput
                            parentStyle={styles.dovInputStyle}
                            textHeader="Date when the month's food supply was received"
                            rightIcon={AppSVGs.dob}
                            placeHolder="Date when the month's food supply was received"
                            hideInput={true}
                            onPress={() => {
                              showDatePicker('2');
                            }}
                            otherText={proStore.foodSupplyDate}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Number of meals carried forward from the previous month"
                            placeHolder="Number of meals carried forward from the previous month"
                            onChangeText={proStore.setNoOfMealsCF}
                            keyboardType="numeric"
                            value={proStore.noOfMealsCF}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Number of meals received this month"
                            placeHolder="Number of meals received this month"
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
                            placeHolder="Has the partner stored the food safely?"
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
                            placeHolder="Is the breakfast being served daily?"
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
                            placeHolder="When is breakfast usually served? (observed by Decimal staff)"
                            rightIcon={AppSVGs.dropdown}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Additional observations or points discussed"
                            placeHolder="Additional observations or points discussed"
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
                            placeHolder="Feedback from a teacher/social worker about highlighted children, program issues, positive feedback"
                            onChangeText={proStore.setTeacherFeedback}
                            value={proStore.teacherFeedback}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Feedback from parents (if available)"
                            placeHolder="Feedback from parents (if available)"
                            onChangeText={proStore.setParentFeedback}
                            value={proStore.parentFeedback}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Feedback from the children (food tastes, thoughts, activity sheets etc)"
                            placeHolder="Feedback from the children (food tastes, thoughts, activity sheets etc)"
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
                            placeHolder="Company name"
                            onChangeText={proStore.setCompanyName}
                            value={proStore.companyName}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Name of volunteer(s)"
                            placeHolder="Name of volunteer(s)"
                            onChangeText={proStore.setVolunteerName}
                            value={proStore.volunteerName}
                          />

                          <View style={styles.hourMinContainer}>
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
                                textHeader=""
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
                            placeHolder="Reason/objective for the volunteering session with Decimal"
                            onChangeText={proStore.setVolunteerReason}
                            value={proStore.volunteerReason}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Any major learning(s)  and/or observations "
                            placeHolder="Any major learning(s)  and/or observations "
                            onChangeText={proStore.setLearnAndObserve}
                            value={proStore.learnAndObserve}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Any other feedback"
                            placeHolder="Any other feedback"
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

                    <View style={styles.hourMinContainer}>
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
                  </View>
                </ScrollView>

                <AppButton
                  title="Save"
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
              setValue={() => {}}
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
  keyboardAvoidStyle: {flex: 1, backgroundColor: colors.palette.primary},
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
  hourMinStyle: {flex: 1, paddingLeft: 10},
  hourMinContainer: {
    flexDirection: 'row',
  },
});
