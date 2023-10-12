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
import {AppButton, AppContainer, AppTextInput} from '../components';
import AppBottomSheet from '../components/common/AppBottomSheet';
import {AppBottomSheetDropdown} from '../components/common/AppBottomSheetDropdown';
import AppInput from '../components/common/AppInput';
import AppToggle from '../components/common/AppToggle';
import Header from '../components/common/Header';
import useCamera from '../custom_hooks/useCamera';
import useProgramStore from '../stores/useProgramStore';
import {colors, typography} from '../theme';
import Utility from '../utils/Utility';
import AppImageUploadInput from '../components/common/AppImageUploadInput';
import AppStrings from '../utils/AppStrings';

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
            <Header title={AppStrings.programMonitoringLabel} />
            <KeyboardAvoidingView
              behavior={Platform.select({ios: 'padding'})}
              style={styles.keyboardAvoidStyle}>
              <View style={styles.backgroundStyle}>
                <ScrollView
                  contentContainerStyle={styles.contentContainerStyle}>
                  <Pressable style={styles.container}>
                    <Text style={styles.headingText}>
                      {AppStrings.PROGRAM_MONITORING_SCREEN.programTitle}
                    </Text>
                    <AppToggle
                      title={AppStrings.partnerInfo}
                      children={
                        <>
                          <AppInput
                            onPress={() => {
                              handleBottomSheetClick('partnerType');
                              handleIndex(2);
                            }}
                            parentStyle={styles.textInputStyle}
                            value={proStore.partnerType}
                            textHeader={AppStrings.partnerType}
                            placeHolder={AppStrings.pleaseSelect}
                            rightIcon={AppSVGs.dropdown}
                          />

                          <AppInput
                            onPress={() => {
                              handleBottomSheetClick('existingPartner');
                              handleIndex(3);
                            }}
                            parentStyle={styles.textInputStyle}
                            value={proStore.existingPartner}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .nameLocExistPartner
                            }
                            placeHolder={AppStrings.pleaseSelect}
                            rightIcon={AppSVGs.dropdown}
                          />

                          {proStore.existingPartner && (
                            <>
                              <AppTextInput
                                parentStyle={styles.textInputStyle}
                                textHeader={AppStrings.location}
                                placeHolder={AppStrings.locationPlaceHolder}
                                value={proStore.existLocation}
                                //onChangeText={cdStore.setLocation}
                                editable={false}
                              />

                              <AppTextInput
                                parentStyle={styles.textInputStyle}
                                textHeader={AppStrings.block}
                                placeHolder={AppStrings.blockPlaceHolder}
                                value={proStore.existBlock}
                                editable={false}
                              />

                              <AppTextInput
                                parentStyle={styles.textInputStyle}
                                textHeader={AppStrings.district}
                                placeHolder={AppStrings.districtPlaceHolder}
                                value={proStore.existDistrict}
                                editable={false}
                              />

                              <AppTextInput
                                parentStyle={styles.textInputStyle}
                                textHeader={AppStrings.state}
                                placeHolder={AppStrings.statePlaceHolder}
                                value={proStore.existState}
                                editable={false}
                              />
                            </>
                          )}

                          <AppTextInput
                            parentStyle={styles.dovInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .dateOfVisitMonitor
                            }
                            rightIcon={AppSVGs.dob}
                            placeHolder={AppStrings.pleaseSelect}
                            hideInput={true}
                            onPress={() => {
                              showDatePicker('1');
                            }}
                            otherText={proStore.dov}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .visitingTeamSize
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
                            onChangeText={proStore.setVVTeamSize}
                            value={proStore.vvTeamSize}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .nameDecimalStaffLiaison
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
                            value={proStore.liaDNameStaff}
                            onChangeText={proStore.setLiaDNameStaff}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .desigDecimalStaffLiaison
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
                            onChangeText={proStore.setLiaDDesigStaff}
                            value={proStore.liaDDesigStaff}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .namePartnerStaffLiaison
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
                            onChangeText={proStore.setLiaPNameStaff}
                            value={proStore.liaPNameStaff}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .desigPartnerStaffLiaison
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
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
                      title={
                        AppStrings.PROGRAM_MONITORING_SCREEN.programCompliance
                      }
                      children={
                        <>
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .numChildPresent
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
                            onChangeText={proStore.setNumberOfChildrenDOV}
                            keyboardType="numeric"
                            value={proStore.numberOfChildrenDOV}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN.avgAttendance
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
                            onChangeText={proStore.setAvgAttendMonth}
                            keyboardType="numeric"
                            value={proStore.averageAttendMonth}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .numNewChildEnroll
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
                            onChangeText={proStore.setNumNewChildEnroll}
                            keyboardType="numeric"
                            value={proStore.numNewChildEnroll}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .numChildDroppedOut
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
                            onChangeText={proStore.setNumChildDropped}
                            keyboardType="numeric"
                            value={proStore.numChildDropped}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN.numChildSick
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
                            value={proStore.numChildSick}
                            onChangeText={proStore.setNumChildSick}
                            keyboardType="numeric"
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN.whatIllness
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
                            onChangeText={proStore.setIllness}
                            value={proStore.illness}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .numActivitySheetReceived
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
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
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .activitySheetCompleted
                            }
                            placeHolder={AppStrings.pleaseSelect}
                            rightIcon={AppSVGs.dropdown}
                          />

                          <AppInput
                            onPress={() => {
                              handleBottomSheetClick('poshanCalendar');
                              handleIndex(1);
                            }}
                            parentStyle={styles.textInputStyle}
                            value={proStore.poshanCalenderCompleted}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .poshanCalendarCompleted
                            }
                            placeHolder={AppStrings.pleaseSelect}
                            rightIcon={AppSVGs.dropdown}
                          />

                          <AppTextInput
                            parentStyle={styles.dovInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .foodSupplyDate
                            }
                            rightIcon={AppSVGs.dob}
                            placeHolder={AppStrings.pleaseEnterDetails}
                            hideInput={true}
                            onPress={() => {
                              showDatePicker('2');
                            }}
                            otherText={proStore.foodSupplyDate}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .mealsCarryForward
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
                            onChangeText={proStore.setNoOfMealsCF}
                            keyboardType="numeric"
                            value={proStore.noOfMealsCF}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .numMealsReceived
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
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
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .storedFoodSafely
                            }
                            placeHolder={AppStrings.pleaseSelect}
                            rightIcon={AppSVGs.dropdown}
                          />

                          <AppInput
                            onPress={() => {
                              handleBottomSheetClick('breakfastServedDaily');
                              handleIndex(1);
                            }}
                            parentStyle={styles.textInputStyle}
                            value={proStore.breakfastServedDaily}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .breakfastServed
                            }
                            placeHolder={AppStrings.pleaseSelect}
                            rightIcon={AppSVGs.dropdown}
                          />

                          <AppInput
                            onPress={() => {
                              handleBottomSheetClick('whenBreakfast');
                              handleIndex(2);
                            }}
                            parentStyle={styles.textInputStyle}
                            value={proStore.whenBreakfast}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .whenBreakfastServed
                            }
                            placeHolder={AppStrings.pleaseSelect}
                            rightIcon={AppSVGs.dropdown}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .additionalPoints
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
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
                      title={
                        AppStrings.PROGRAM_MONITORING_SCREEN.beneficiaryFollowUp
                      }
                      children={
                        <>
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .feedbackTeacher
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
                            onChangeText={proStore.setTeacherFeedback}
                            value={proStore.teacherFeedback}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .feedbackParents
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
                            onChangeText={proStore.setParentFeedback}
                            value={proStore.parentFeedback}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .feedbackChildren
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
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
                      title={
                        AppStrings.PROGRAM_MONITORING_SCREEN.volunteersInfo
                      }
                      children={
                        <>
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN.companyName
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
                            onChangeText={proStore.setCompanyName}
                            value={proStore.companyName}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .nameOfVolunteers
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
                            onChangeText={proStore.setVolunteerName}
                            value={proStore.volunteerName}
                          />

                          <View style={styles.hourMinContainer}>
                            <View style={styles.hourMinStyle}>
                              <AppInput
                                textHeader={
                                  AppStrings.PROGRAM_MONITORING_SCREEN
                                    .volunteerSessionDuration
                                }
                                placeHolder={AppStrings.hourPlaceHolder}
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
                                placeHolder={AppStrings.minutePlaceHolder}
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
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .volunteerReason
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
                            onChangeText={proStore.setVolunteerReason}
                            value={proStore.volunteerReason}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN
                                .majorLearnings
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
                            onChangeText={proStore.setLearnAndObserve}
                            value={proStore.learnAndObserve}
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN.otherFeedback
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
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
                          textHeader={
                            AppStrings.PROGRAM_MONITORING_SCREEN.durationOfVisit
                          }
                          placeHolder={AppStrings.hourPlaceHolder}
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
                          placeHolder={AppStrings.minutePlaceHolder}
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
                      title={
                        AppStrings.PROGRAM_MONITORING_SCREEN.monitoringPhotos
                      }
                      selectedImages={selectedImages}
                      onPress={proStore.togglePhotoBottomSheet}
                      removeImage={removeImage}
                    />
                  </Pressable>
                </ScrollView>

                <AppButton
                  title={AppStrings.submit}
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
                <Text style={styles.headerStyle}>{AppStrings.uploadPhoto}</Text>
                <TouchableOpacity onPress={proStore.togglePhotoBottomSheet}>
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
