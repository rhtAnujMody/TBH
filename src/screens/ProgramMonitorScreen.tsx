import BottomSheet from '@gorhom/bottom-sheet/';
import {Observer} from 'mobx-react-lite';
import React, {useEffect, useRef} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AppBottomSheet,
  AppBottomSheetDropdown,
  AppButton,
  AppContainer,
  AppDashedLine,
  AppImageUploadInput,
  AppInput,
  AppTextInput,
  AppToggle,
  Header,
} from '../components';

import DatePicker from 'react-native-date-picker';

import {AppSVGs} from '../assets';
import {useCamera} from '../custom_hooks';
import {useProgramStore} from '../stores';
import {styles} from '../styles/formStyles';
import AppStrings from '../utils/AppStrings';
import Utility from '../utils/Utility';
import {AppToggleRef} from '../components/common/AppToggle';

const ProgramMonitorScreen = () => {
  const proStore = useProgramStore();

  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const toggleRefs = useRef<AppToggleRef[]>([]);

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
    proStore.setShowSearchBar(false);
  };
  const handleIndex = (value: number) => {
    proStore.setIndex(value);
  };

  const showDatePicker = (id: string) => {
    proStore.setCalenderID(id);
    proStore.toogleCalender();
  };

  const handleSubmit = () => {
    toggleRefs.current.forEach(ref => ref?.toggle(true));
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

    useEffect(() => {
      proStore.getPartnerList();
    }, []);

  return (
    <Observer>
      {() => (
        <>
          <AppContainer>
            <Header title={AppStrings.programMonitoringLabel} />
            <KeyboardAvoidingView
              behavior={Platform.select({ios: 'padding'})}
              style={styles.keyboardAwoidStyle}>
              <View style={styles.backgroundStyle}>
                <ScrollView
                  contentContainerStyle={styles.contentContainerStyle}>
                  <Pressable style={styles.container}>
                    <Text style={styles.headingText}>
                      {AppStrings.PROGRAM_MONITORING_SCREEN.programTitle}
                    </Text>
                    <AppToggle
                      title={AppStrings.partnerInfo}
                      ref={el => (toggleRefs.current[0] = el!)}
                      children={
                        <>
                          <AppInput
                            onPress={() => {
                              handleBottomSheetClick('partnerType');
                              handleIndex(2);
                            }}
                            parentStyle={styles.textInputStyle}
                            value={proStore.partnerType}
                            textHeader={AppStrings.partnerTypePlaceHolder}
                            placeHolder={AppStrings.pleaseSelect}
                            rightIcon={AppSVGs.dropdown}
                            errorMessage={proStore.errorMessages.partnerType}
                            isMandatory
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
                                .nameLocExistPartnerPlaceHolder
                            }
                            placeHolder={AppStrings.pleaseSelect}
                            rightIcon={AppSVGs.dropdown}
                            errorMessage={
                              proStore.errorMessages.existingPartner
                            }
                            isMandatory
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
                            errorMessage={proStore.errorMessages.dov}
                            isMandatory
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
                            errorMessage={proStore.errorMessages.vvTeamSize}
                            isMandatory
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
                            errorMessage={proStore.errorMessages.liaDNameStaff}
                            isMandatory
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
                            errorMessage={proStore.errorMessages.liaDDesigStaff}
                            isMandatory
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
                            errorMessage={proStore.errorMessages.liaPNameStaff}
                            isMandatory
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
                            errorMessage={proStore.errorMessages.liaPDesigStaff}
                            isMandatory
                          />
                        </>
                      }
                    />
                    <AppDashedLine />
                    <AppToggle
                      title={
                        AppStrings.PROGRAM_MONITORING_SCREEN.programCompliance
                      }
                      ref={el => (toggleRefs.current[1] = el!)}
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
                            errorMessage={
                              proStore.errorMessages.numberOfChildrenDOV
                            }
                            isMandatory
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
                            errorMessage={
                              proStore.errorMessages.averageAttendMonth
                            }
                            isMandatory
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
                            errorMessage={
                              proStore.errorMessages.numNewChildEnroll
                            }
                            isMandatory
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
                            errorMessage={
                              proStore.errorMessages.numChildDropped
                            }
                            isMandatory
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
                            errorMessage={proStore.errorMessages.numChildSick}
                            isMandatory
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN.whatIllness
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
                            onChangeText={proStore.setIllness}
                            value={proStore.illness}
                            errorMessage={proStore.errorMessages.illness}
                            isMandatory
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
                            keyboardType="numeric"
                            errorMessage={
                              proStore.errorMessages.numberedActivitySheet
                            }
                            isMandatory
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
                            errorMessage={
                              proStore.errorMessages.activitySheetCompleted
                            }
                            isMandatory
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
                            errorMessage={
                              proStore.errorMessages.poshanCalenderCompleted
                            }
                            isMandatory
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
                            errorMessage={proStore.errorMessages.foodSupplyDate}
                            isMandatory
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
                            errorMessage={proStore.errorMessages.noOfMealsCF}
                            isMandatory
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
                            errorMessage={
                              proStore.errorMessages.noOfMealsReceive
                            }
                            isMandatory
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
                            errorMessage={
                              proStore.errorMessages.storedFoodSafely
                            }
                            isMandatory
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
                            errorMessage={
                              proStore.errorMessages.breakfastServedDaily
                            }
                            isMandatory
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
                            errorMessage={proStore.errorMessages.whenBreakfast}
                            isMandatory
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
                            errorMessage={
                              proStore.errorMessages.addObservations
                            }
                            isMandatory
                          />
                        </>
                      }
                    />
                    <AppDashedLine />
                    <AppToggle
                      title={
                        AppStrings.PROGRAM_MONITORING_SCREEN.beneficiaryFollowUp
                      }
                      ref={el => (toggleRefs.current[2] = el!)}
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
                            errorMessage={
                              proStore.errorMessages.teacherFeedback
                            }
                            isMandatory
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
                            errorMessage={proStore.errorMessages.parentFeedback}
                            isMandatory
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
                            errorMessage={proStore.errorMessages.childFeedback}
                            isMandatory
                          />
                        </>
                      }
                    />
                    <AppDashedLine />

                    <AppToggle
                      title={
                        AppStrings.PROGRAM_MONITORING_SCREEN.volunteersInfo
                      }
                      ref={el => (toggleRefs.current[3] = el!)}
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
                            errorMessage={proStore.errorMessages.companyName}
                            isMandatory
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
                            errorMessage={proStore.errorMessages.volunteerName}
                            isMandatory
                          />
                          <Text style={styles.volunteerTitle}>
                            Duration of the Volunteer Session{' '}
                            <Text style={{color: 'red'}}>*</Text>
                          </Text>
                          <View style={styles.hourContainer}>
                            <View style={styles.hourMinContainer}>
                              <AppInput
                                placeHolder="Hour"
                                value={proStore.volunteerHour}
                                parentStyle={styles.textInputStyle}
                                onPress={() => {
                                  handleBottomSheetClick('volunteerHour');
                                  handleIndex(3);
                                }}
                                rightIcon={AppSVGs.dropdown}
                                errorMessage={
                                  proStore.errorMessages.volunteerHour
                                }
                              />
                            </View>
                            <AppInput
                              placeHolder="Minute"
                              value={proStore.volunteerMinute}
                              parentStyle={styles.textInputStyle}
                              onPress={() => {
                                handleBottomSheetClick('volunteerMinute');
                                handleIndex(3);
                              }}
                              rightIcon={AppSVGs.dropdown}
                              errorMessage={
                                proStore.errorMessages.volunteerMinute
                              }
                            />
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
                            errorMessage={
                              proStore.errorMessages.volunteerReason
                            }
                            isMandatory
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
                            errorMessage={
                              proStore.errorMessages.learnAndObserve
                            }
                            isMandatory
                          />

                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader={
                              AppStrings.PROGRAM_MONITORING_SCREEN.otherFeedback
                            }
                            placeHolder={AppStrings.pleaseEnterDetails}
                            onChangeText={proStore.setOtherFeedback}
                            value={proStore.otherFeedback}
                            errorMessage={proStore.errorMessages.otherFeedback}
                            isMandatory
                          />
                        </>
                      }
                    />
                    <AppDashedLine />

                    <View
                      style={[styles.hourContainer, styles.dashedLineMargin]}>
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
                          errorMessage={proStore.errorMessages.hour}
                          isMandatory
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
                          errorMessage={proStore.errorMessages.minute}
                        />
                      </View>
                    </View>
                    <AppDashedLine />
                    <AppImageUploadInput
                      title={
                        AppStrings.PROGRAM_MONITORING_SCREEN.monitoringPhotos
                      }
                      selectedImages={selectedImages}
                      onPress={proStore.togglePhotoBottomSheet}
                      removeImage={removeImage}
                      style={styles.dashedLineMargin}
                      errorMessage={proStore.errorMessages.selectedImages}
                    />
                  </Pressable>
                </ScrollView>

                <AppButton
                  title={AppStrings.submit}
                  style={styles.buttonStyle}
                  width={'90%'}
                  isLoading={proStore.isLoading}
                  onPress={() => {
                    handleSubmit();
                    proStore.setSelectedImages(selectedImages);
                    proStore.sendData();
                  }}
                  enabled={true}
                />
              </View>
            </KeyboardAvoidingView>
          </AppContainer>

          <DatePicker
            modal
            mode="date"
            date={new Date()}
            open={proStore.showCalender}
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
              search={proStore.showSearchBar}
              header={proStore.bottomSheetHeader}
              data={proStore.bottomSheetArray}
              onClose={() => {
                bottomSheetRef?.current?.close();
                proStore.toggleBottomSheet();
                proStore.setShowSearchBar(false);
              }}
              onItemSelect={proStore.setValue}
              onPress={() => {
                proStore.toggleBottomSheet();
                proStore.setShowSearchBar(false);
              }}
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
