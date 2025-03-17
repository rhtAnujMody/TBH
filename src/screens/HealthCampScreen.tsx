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
  AppDashedLine,
} from '../components';
import DatePicker from 'react-native-date-picker';
import AppStrings from '../utils/AppStrings';

import Utility from '../utils/Utility';
import {colors} from '../theme';
import {useHealthStore} from '../stores';
import {useCamera} from '../custom_hooks';
import {styles} from '../styles/formStyles';
import {AppToggleRef} from '../components/common/AppToggle';

const HealthCampScreen = () => {
  const healthStore = useHealthStore();
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const toggleRefs = useRef<AppToggleRef[]>([]);
  const {openGallery, removeImage, takePhotoFromCamera, selectedImages} =
    useCamera();

  const handleBottomSheetClick = (from: string, index?: number) => {
    healthStore.setIndex(index ?? 1);
    healthStore.toggleBottomSheet(from);
  };

  const hideBottomSheet = () => {
    healthStore.toggleBottomSheet();
    healthStore.setShowSearchBar(false);
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

  const handleSubmit = () => {
    toggleRefs.current.forEach(ref => ref?.toggle(true));
  };

  useEffect(() => {
    healthStore.getItem();
    healthStore.getPartnerList();
  }, []);

  const handleConfirm = (date: Date) => {
    switch (healthStore.calenderID) {
      case '1':
        healthStore.setDOHC(Utility.formatDate(date));
        break;
      case '2':
        healthStore.setDOB(Utility.formatDate(date));
        healthStore.setAge(
          Utility.calculateAgeInMonths(Utility.formatDate(date)).toString(),
        );
        healthStore.disableAgeEdit();
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
            <Header title={AppStrings.healthCampLabel} />
            <KeyboardAvoidingView
              behavior={Platform.select({ios: 'padding'})}
              style={styles.keyboardAwoidStyle}>
              <View style={styles.backgroundStyle}>
                <ScrollView
                  contentContainerStyle={styles.contentContainerStyle}>
                  <Pressable>
                    <View style={styles.container}>
                      <Text style={styles.headingText}>
                        {AppStrings.HEALTH_CAMP_SCREEN.healthCampTitle}
                      </Text>

                      <AppToggle
                        title={AppStrings.partnerDetails}
                        ref={el => (toggleRefs.current[0] = el!)}
                        children={
                          <>
                            <AppInput
                              onPress={() => {
                                handleBottomSheetClick('partner');
                              }}
                              parentStyle={styles.textInputStyle}
                              value={healthStore.partner}
                              textHeader={
                                AppStrings.newExistingPartnerPlaceHolder
                              }
                              placeHolder={
                                AppStrings.newExistingPartnerPlaceHolder
                              }
                              rightIcon={AppSVGs.dropdown}
                              errorMessage={healthStore.errorMessages.partner}
                              isMandatory
                            />
                            {healthStore.partner === AppStrings.new ? (
                              <>
                                <AppTextInput
                                  value={healthStore.newPartnerName}
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.partnerNamePlaceHolder}
                                  placeHolder={
                                    AppStrings.partnerNamePlaceHolder
                                  }
                                  onChangeText={healthStore.setNewPartnerName}
                                  errorMessage={
                                    healthStore.errorMessages.newPartnerName
                                  }
                                  isMandatory
                                />

                                <AppTextInput
                                  value={healthStore.newLocation}
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.locationPlaceHolder}
                                  placeHolder={AppStrings.locationPlaceHolder}
                                  onChangeText={healthStore.setNewLocation}
                                  errorMessage={
                                    healthStore.errorMessages.newLocation
                                  }
                                  isMandatory
                                />

                                <AppTextInput
                                  value={healthStore.newBlock}
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.blockPlaceHolder}
                                  placeHolder={AppStrings.blockPlaceHolder}
                                  onChangeText={healthStore.setNewBlock}
                                  errorMessage={
                                    healthStore.errorMessages.newBlock
                                  }
                                  isMandatory
                                />

                                <AppTextInput
                                  value={healthStore.newDistrict}
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.districtPlaceHolder}
                                  placeHolder={AppStrings.districtPlaceHolder}
                                  onChangeText={healthStore.setNewDistrict}
                                  errorMessage={
                                    healthStore.errorMessages.newDistrict
                                  }
                                  isMandatory
                                />

                                <AppTextInput
                                  value={healthStore.newState}
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.statePlaceHolder}
                                  placeHolder={AppStrings.statePlaceHolder}
                                  onChangeText={healthStore.setNewState}
                                  errorMessage={
                                    healthStore.errorMessages.newState
                                  }
                                  isMandatory
                                />
                              </>
                            ) : healthStore.partner === AppStrings.existing ? (
                              <>
                                <AppInput
                                  onPress={() => {
                                    handleBottomSheetClick('partnerName');
                                    healthStore.setIndex(3);
                                  }}
                                  parentStyle={styles.textInputStyle}
                                  value={healthStore.existPartnerName}
                                  textHeader={AppStrings.partnerNamePlaceHolder}
                                  placeHolder={
                                    AppStrings.partnerNamePlaceHolder
                                  }
                                  rightIcon={AppSVGs.dropdown}
                                  errorMessage={
                                    healthStore.errorMessages.existPartnerName
                                  }
                                  isMandatory
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.locationPlaceHolder}
                                  placeHolder={AppStrings.locationPlaceHolder}
                                  value={healthStore.existLocation}
                                  //onChangeText={cdStore.setLocation}
                                  editable={false}
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.blockPlaceHolder}
                                  placeHolder={AppStrings.blockPlaceHolder}
                                  value={healthStore.existBlock}
                                  editable={false}
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.districtPlaceHolder}
                                  placeHolder={AppStrings.districtPlaceHolder}
                                  value={healthStore.existDistrict}
                                  editable={false}
                                />

                                <AppTextInput
                                  parentStyle={styles.textInputStyle}
                                  textHeader={AppStrings.statePlaceHolder}
                                  placeHolder={AppStrings.statePlaceHolder}
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
                              textHeader={AppStrings.partnerTypePlaceHolder}
                              placeHolder={AppStrings.partnerTypePlaceHolder}
                              rightIcon={AppSVGs.dropdown}
                              errorMessage={
                                healthStore.errorMessages.partnerType
                              }
                              isMandatory
                            />
                          </>
                        }
                      />

                      <AppDashedLine />

                      <AppToggle
                        title={AppStrings.HEALTH_CAMP_SCREEN.healthCampDetails}
                        ref={el => (toggleRefs.current[1] = el!)}
                        children={
                          <>
                            <AppTextInput
                              parentStyle={styles.dovInputStyle}
                              textHeader={
                                AppStrings.HEALTH_CAMP_SCREEN.healthCampDate
                              }
                              rightIcon={AppSVGs.dob}
                              placeHolder={
                                AppStrings.HEALTH_CAMP_SCREEN.healthCampDate
                              }
                              hideInput={true}
                              onPress={() => {
                                showDatePicker('1');
                              }}
                              otherText={healthStore.dohc}
                              errorMessage={healthStore.errorMessages.dohc}
                              isMandatory
                            />

                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader={
                                AppStrings.HEALTH_CAMP_SCREEN.healthCampNumber
                              }
                              placeHolder={
                                AppStrings.HEALTH_CAMP_SCREEN.healthCampNumber
                              }
                              value={healthStore.numberHC}
                              onChangeText={healthStore.setNumberHC}
                              errorMessage={healthStore.errorMessages.numberHC}
                              isMandatory
                            />
                          </>
                        }
                      />

                      <AppDashedLine />

                      <AppToggle
                        title={AppStrings.HEALTH_CAMP_SCREEN.childDetails}
                        ref={el => (toggleRefs.current[2] = el!)}
                        children={
                          <>
                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader={
                                AppStrings.HEALTH_CAMP_SCREEN.childsName
                              }
                              placeHolder={
                                AppStrings.HEALTH_CAMP_SCREEN.childsName
                              }
                              value={healthStore.childName}
                              onChangeText={healthStore.setChildName}
                              errorMessage={healthStore.errorMessages.childName}
                              isMandatory
                            />

                            <AppImageUploadInput
                              title={AppStrings.HEALTH_CAMP_SCREEN.childsPhoto}
                              selectedImages={selectedImages}
                              onPress={healthStore.togglePhotoBottomSheet}
                              removeImage={removeImage}
                            />

                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader={AppStrings.contact}
                              placeHolder={AppStrings.contact}
                              value={healthStore.contact}
                              onChangeText={healthStore.setContact}
                              maxLength={10}
                              errorMessage={healthStore.errorMessages.contact}
                              isMandatory
                            />

                            <AppTextInput
                              parentStyle={styles.dovInputStyle}
                              textHeader={AppStrings.dob}
                              rightIcon={AppSVGs.dob}
                              placeHolder={AppStrings.dob}
                              hideInput={true}
                              onPress={() => {
                                showDatePicker('2');
                              }}
                              otherText={healthStore.dob}
                              errorMessage={healthStore.errorMessages.dob}
                            />

                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader={AppStrings.HEALTH_CAMP_SCREEN.age}
                              placeHolder={AppStrings.HEALTH_CAMP_SCREEN.age}
                              value={healthStore.age}
                              editable={healthStore.ageIsEditable}
                              onChangeText={healthStore.setAge}
                              errorMessage={healthStore.errorMessages.age}
                              isMandatory
                            />

                            <AppInput
                              onPress={() => {
                                handleBottomSheetClick('gender', 3);
                              }}
                              parentStyle={styles.textInputStyle}
                              value={healthStore.gender}
                              textHeader={AppStrings.HEALTH_CAMP_SCREEN.gender}
                              placeHolder={AppStrings.HEALTH_CAMP_SCREEN.gender}
                              rightIcon={AppSVGs.dropdown}
                              errorMessage={healthStore.errorMessages.gender}
                              isMandatory
                            />

                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader={AppStrings.HEALTH_CAMP_SCREEN.height}
                              placeHolder={
                                AppStrings.HEALTH_CAMP_SCREEN.heightPlaceHolder
                              }
                              value={healthStore.height}
                              onChangeText={healthStore.setHeight}
                              errorMessage={healthStore.errorMessages.height}
                              isMandatory
                            />

                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader={AppStrings.HEALTH_CAMP_SCREEN.weight}
                              placeHolder={
                                AppStrings.HEALTH_CAMP_SCREEN.weightPlaceHolder
                              }
                              value={healthStore.weight}
                              onChangeText={healthStore.setWeight}
                              errorMessage={healthStore.errorMessages.weight}
                              isMandatory
                            />

                            <AppTextInput
                              parentStyle={styles.textInputStyle}
                              textHeader={AppStrings.HEALTH_CAMP_SCREEN.muac}
                              placeHolder={
                                AppStrings.HEALTH_CAMP_SCREEN.muacPlaceHolder
                              }
                              value={healthStore.muac}
                              onChangeText={healthStore.setMUAC}
                              errorMessage={healthStore.errorMessages.muac}
                              isMandatory
                            />

                            <AppInput
                              onPress={() => {
                                handleBottomSheetClick('vitaminA', 3);
                              }}
                              parentStyle={styles.textInputStyle}
                              value={healthStore.vitaminA}
                              textHeader={
                                AppStrings.HEALTH_CAMP_SCREEN.vitaminA
                              }
                              placeHolder={
                                AppStrings.HEALTH_CAMP_SCREEN.vitaminA
                              }
                              rightIcon={AppSVGs.dropdown}
                              errorMessage={healthStore.errorMessages.vitaminA}
                              isMandatory
                            />

                            {healthStore.vitaminA ===
                              AppStrings.HEALTH_CAMP_SCREEN.done && (
                              <>
                                <AppInput
                                  onPress={() => {
                                    handleBottomSheetClick('doneBy', 3);
                                  }}
                                  parentStyle={styles.textInputStyle}
                                  value={healthStore.doneBy}
                                  textHeader={
                                    AppStrings.HEALTH_CAMP_SCREEN.doneByWhom
                                  }
                                  placeHolder={
                                    AppStrings.HEALTH_CAMP_SCREEN.doneByWhom
                                  }
                                  rightIcon={AppSVGs.dropdown}
                                  errorMessage={
                                    healthStore.errorMessages.doneBy
                                  }
                                  isMandatory
                                />
                                {healthStore.doneBy && (
                                  <>
                                    <AppTextInput
                                      parentStyle={styles.dovInputStyle}
                                      textHeader={
                                        AppStrings.HEALTH_CAMP_SCREEN.dateOfDose
                                      }
                                      rightIcon={AppSVGs.dob}
                                      placeHolder={
                                        AppStrings.HEALTH_CAMP_SCREEN.dateOfDose
                                      }
                                      hideInput={true}
                                      onPress={() => {
                                        showDatePicker('3');
                                      }}
                                      otherText={healthStore.dateOfDoseVitamin}
                                      errorMessage={
                                        healthStore.errorMessages
                                          .dateOfDoseVitamin
                                      }
                                      isMandatory
                                    />

                                    <AppTextInput
                                      parentStyle={styles.textInputStyle}
                                      textHeader={
                                        AppStrings.HEALTH_CAMP_SCREEN
                                          .durationOfCourse
                                      }
                                      placeHolder={
                                        AppStrings.HEALTH_CAMP_SCREEN
                                          .durationOfCourse
                                      }
                                      value={healthStore.durationOfCourse}
                                      onChangeText={
                                        healthStore.setDurationOfCourse
                                      }
                                      errorMessage={
                                        healthStore.errorMessages
                                          .durationOfCourse
                                      }
                                      isMandatory
                                    />

                                    <AppTextInput
                                      parentStyle={styles.textInputStyle}
                                      textHeader={
                                        AppStrings.HEALTH_CAMP_SCREEN
                                          .locationOfDose
                                      }
                                      placeHolder={
                                        AppStrings.HEALTH_CAMP_SCREEN
                                          .locationOfDose
                                      }
                                      value={healthStore.locationOfDose}
                                      onChangeText={
                                        healthStore.setLocationOfDose
                                      }
                                      errorMessage={
                                        healthStore.errorMessages.locationOfDose
                                      }
                                      isMandatory
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
                              textHeader={
                                AppStrings.HEALTH_CAMP_SCREEN.deworming
                              }
                              placeHolder={
                                AppStrings.HEALTH_CAMP_SCREEN.deworming
                              }
                              rightIcon={AppSVGs.dropdown}
                              errorMessage={healthStore.errorMessages.deworming}
                              isMandatory
                            />

                            {healthStore.deworming ===
                              AppStrings.HEALTH_CAMP_SCREEN.done && (
                              <>
                                <AppInput
                                  onPress={() => {
                                    handleBottomSheetClick('doneByWorm', 3);
                                  }}
                                  parentStyle={styles.textInputStyle}
                                  value={healthStore.doneByWorm}
                                  textHeader={
                                    AppStrings.HEALTH_CAMP_SCREEN.doneByWhom
                                  }
                                  placeHolder={
                                    AppStrings.HEALTH_CAMP_SCREEN.doneByWhom
                                  }
                                  rightIcon={AppSVGs.dropdown}
                                  errorMessage={
                                    healthStore.errorMessages.doneByWorm
                                  }
                                  isMandatory
                                />

                                {healthStore.doneByWorm && (
                                  <>
                                    <AppTextInput
                                      parentStyle={styles.dovInputStyle}
                                      textHeader={
                                        AppStrings.HEALTH_CAMP_SCREEN.dateOfDose
                                      }
                                      rightIcon={AppSVGs.dob}
                                      placeHolder={
                                        AppStrings.HEALTH_CAMP_SCREEN.dateOfDose
                                      }
                                      hideInput={true}
                                      onPress={() => {
                                        showDatePicker('4');
                                      }}
                                      otherText={healthStore.dateOfDoseDeworm}
                                      errorMessage={
                                        healthStore.errorMessages
                                          .dateOfDoseDeworm
                                      }
                                      isMandatory
                                    />

                                    <AppTextInput
                                      parentStyle={styles.textInputStyle}
                                      textHeader={
                                        AppStrings.HEALTH_CAMP_SCREEN
                                          .durationOfCourse
                                      }
                                      placeHolder={
                                        AppStrings.HEALTH_CAMP_SCREEN
                                          .durationOfCourse
                                      }
                                      value={healthStore.durationOfCourseWorm}
                                      onChangeText={
                                        healthStore.setDurationOfCourseWorm
                                      }
                                      errorMessage={
                                        healthStore.errorMessages
                                          .durationOfCourseWorm
                                      }
                                      isMandatory
                                    />

                                    <AppTextInput
                                      parentStyle={styles.textInputStyle}
                                      textHeader={
                                        AppStrings.HEALTH_CAMP_SCREEN
                                          .locationOfDose
                                      }
                                      placeHolder={
                                        AppStrings.HEALTH_CAMP_SCREEN
                                          .locationOfDose
                                      }
                                      value={healthStore.locationOfDoseWorm}
                                      onChangeText={
                                        healthStore.setLocationOfDoseWorm
                                      }
                                      errorMessage={
                                        healthStore.errorMessages
                                          .locationOfDoseWorm
                                      }
                                      isMandatory
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
                              textHeader={AppStrings.HEALTH_CAMP_SCREEN.ifa}
                              placeHolder={AppStrings.HEALTH_CAMP_SCREEN.ifa}
                              rightIcon={AppSVGs.dropdown}
                              errorMessage={healthStore.errorMessages.ifa}
                              isMandatory
                            />

                            {healthStore.ifa ===
                              AppStrings.HEALTH_CAMP_SCREEN.done && (
                              <>
                                <AppInput
                                  onPress={() => {
                                    handleBottomSheetClick('doneByIFA', 3);
                                  }}
                                  parentStyle={styles.textInputStyle}
                                  value={healthStore.doneByIFA}
                                  textHeader={
                                    AppStrings.HEALTH_CAMP_SCREEN.doneByWhom
                                  }
                                  placeHolder={
                                    AppStrings.HEALTH_CAMP_SCREEN.doneByWhom
                                  }
                                  rightIcon={AppSVGs.dropdown}
                                  errorMessage={
                                    healthStore.errorMessages.doneByIFA
                                  }
                                  isMandatory
                                />

                                {healthStore.doneByIFA && (
                                  <>
                                    <AppTextInput
                                      parentStyle={styles.dovInputStyle}
                                      textHeader={
                                        AppStrings.HEALTH_CAMP_SCREEN.dateOfDose
                                      }
                                      rightIcon={AppSVGs.dob}
                                      placeHolder={
                                        AppStrings.HEALTH_CAMP_SCREEN.dateOfDose
                                      }
                                      hideInput={true}
                                      onPress={() => {
                                        showDatePicker('5');
                                      }}
                                      otherText={healthStore.dateOfDoseIFA}
                                      errorMessage={
                                        healthStore.errorMessages.dateOfDoseIFA
                                      }
                                      isMandatory
                                    />

                                    <AppTextInput
                                      parentStyle={styles.textInputStyle}
                                      textHeader={
                                        AppStrings.HEALTH_CAMP_SCREEN
                                          .durationOfCourse
                                      }
                                      placeHolder={
                                        AppStrings.HEALTH_CAMP_SCREEN
                                          .durationOfCourse
                                      }
                                      value={healthStore.durationOfCourseIFA}
                                      onChangeText={
                                        healthStore.setDurationOfCourseIFA
                                      }
                                      errorMessage={
                                        healthStore.errorMessages
                                          .durationOfCourseIFA
                                      }
                                      isMandatory
                                    />

                                    <AppTextInput
                                      parentStyle={styles.textInputStyle}
                                      textHeader={
                                        AppStrings.HEALTH_CAMP_SCREEN
                                          .locationOfDose
                                      }
                                      placeHolder={
                                        AppStrings.HEALTH_CAMP_SCREEN
                                          .locationOfDose
                                      }
                                      value={healthStore.locationOfDoseIFA}
                                      onChangeText={
                                        healthStore.setLocationOfDoseIFA
                                      }
                                      errorMessage={
                                        healthStore.errorMessages
                                          .locationOfDoseIFA
                                      }
                                      isMandatory
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
                              textHeader={
                                AppStrings.HEALTH_CAMP_SCREEN.targetBeneficiary
                              }
                              placeHolder={
                                AppStrings.HEALTH_CAMP_SCREEN.targetBeneficiary
                              }
                              rightIcon={AppSVGs.dropdown}
                              errorMessage={
                                healthStore.errorMessages.targetBeneficiary
                              }
                              isMandatory
                            />

                            <AppInput
                              onPress={() => {
                                handleBottomSheetClick('educationalDetails', 3);
                              }}
                              parentStyle={styles.textInputStyle}
                              value={healthStore.educationalDetails}
                              textHeader={
                                AppStrings.HEALTH_CAMP_SCREEN.educationalDetails
                              }
                              placeHolder={
                                AppStrings.HEALTH_CAMP_SCREEN.educationalDetails
                              }
                              rightIcon={AppSVGs.dropdown}
                              errorMessage={
                                healthStore.errorMessages.educationalDetails
                              }
                              isMandatory
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
                  isLoading={healthStore.isLoading}
                  onPress={() => {
                    handleSubmit();
                    healthStore.setSelectedImages(selectedImages);
                    healthStore.handleSubmit();
                  }}
                  enabled={true}
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
              search={healthStore.showSearchBar}
              header={healthStore.bottomSheetHeader}
              data={healthStore.bottomSheetArray}
              onClose={() => {
                bottomSheetRef?.current?.close();
                healthStore.toggleBottomSheet();
                healthStore.setShowSearchBar(false);
              }}
              onItemSelect={healthStore.setValue}
              onPress={() => {
                healthStore.toggleBottomSheet();
                healthStore.setShowSearchBar(false);
              }}
            />
          </AppBottomSheet>

          <DatePicker
            modal
            mode="date"
            date={new Date()}
            open={healthStore.showCalender}
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
                <Text style={styles.headerStyle}>{AppStrings.uploadPhoto}</Text>
                <TouchableOpacity onPress={healthStore.togglePhotoBottomSheet}>
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

export default HealthCampScreen;
