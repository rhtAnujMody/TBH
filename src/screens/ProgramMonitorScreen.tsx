import BottomSheet from '@gorhom/bottom-sheet/';
import {Observer} from 'mobx-react-lite';
import React, {useRef, useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
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
import ImageCropPicker, {Image} from 'react-native-image-crop-picker';
import useProgramStore from '../stores/useProgramStore';
import {colors, typography} from '../theme';
import Utility from '../utils/Utility';

const ProgramMonitorScreen = () => {
  const proStore = useProgramStore();

  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const [showCalender, setShowCalender] = useState(false);
  const [showCalender2, setShowCalender2] = useState(false);
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);

  useEffect(() => {
    requestPermission();
    // console.log(selectedImages[0].path);
  }, []);

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
      if (
        granted['android.permission.CAMERA'] &&
        granted['android.permission.READ_MEDIA_IMAGES']
      ) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (error) {
      console.log('permission error', error);
    }
  };

  const openGallery = () => {
    ImageCropPicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      maxFiles: 5 - selectedImages.length, // Limit the number of images to 5
    })
      .then(images => {
        if (images.length > 5) {
        }
        setSelectedImages(prevSelectedImages =>
          prevSelectedImages.concat(images),
        );
      })
      .catch(error => {
        console.log('Error selecting images:', error);
      });
    proStore.togglePhotoBottomSheet();
  };

  const removeImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const takePhotoFromCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      proStore.togglePhotoBottomSheet();
    });
    //cdStore.togglePhotoBottomSheet();
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

  const showDatePicker = () => {
    setShowCalender(true);
  };

  const showDatePicker2 = () => {
    setShowCalender2(true);
  };

  const hideDatePicker = () => {
    setShowCalender(false);
  };

  const hideDatePicker2 = () => {
    setShowCalender2(false);
  };

  const handleConfirm = (date: Date) => {
    proStore.setDOV(Utility.formatDate(date));
    hideDatePicker();
  };
  const handleConfirm2 = (date: Date) => {
    proStore.setFoodSupplyDate(Utility.formatDate(date));
    hideDatePicker();
  };

  return (
    <>
      <AppContainer>
        <Header title={'Program Monitoring'} />
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding'})}
          style={styles.keyboardAvoidStyle}>
          <View style={styles.backgroundStyle}>
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
              <View style={styles.container}>
                <Text style={styles.headingText}>
                  Enter details related to the Program Monitoring event
                </Text>
                <AppToggle
                  title={'Partner Info'}
                  children={
                    <>
                      <Observer>
                        {() => (
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
                        )}
                      </Observer>
                      <Observer>
                        {() => (
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
                        )}
                      </Observer>

                      <Observer>
                        {() =>
                          proStore.existingPartner ? (
                            <>
                              <Observer>
                                {() => (
                                  <AppTextInput
                                    parentStyle={styles.textInputStyle}
                                    textHeader="LOCATION"
                                    placeHolder="Location"
                                    value={proStore.existLocation}
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
                                    value={proStore.existBlock}
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
                                    value={proStore.existDistrict}
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
                                    value={proStore.existState}
                                    editable={false}
                                  />
                                )}
                              </Observer>
                            </>
                          ) : null
                        }
                      </Observer>

                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.dovInputStyle}
                            textHeader="DATE OF VISIT"
                            rightIcon={AppSVGs.dob}
                            placeHolder="Date Of Visit for Monitoring"
                            hideInput={true}
                            onPress={showDatePicker}
                            otherText={proStore.dov}
                          />
                        )}
                      </Observer>
                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Visiting team size (staff/volunteers)"
                            placeHolder="Visiting team size (staff/volunteers)"
                            onChangeText={proStore.setVVTeamSize}
                            keyboardType="numeric"
                          />
                        )}
                      </Observer>
                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Partner liaison for the visit"
                            placeHolder="Name and designation of decimal staff"
                            onChangeText={proStore.setLiaDStaff}
                          />
                        )}
                      </Observer>
                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Partner liaison for the visit"
                            placeHolder="Name and designation of Partner's staff"
                            onChangeText={proStore.setLiaPStaff}
                          />
                        )}
                      </Observer>
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
                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Number of children present on the day of visit"
                            placeHolder="Number of children present on the day of visit"
                            onChangeText={proStore.setNumberOfChildrenDOV}
                            keyboardType="numeric"
                          />
                        )}
                      </Observer>
                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Avg. class/school attendance  for the month"
                            placeHolder="Avg. class/school attendance  for the month"
                            onChangeText={proStore.setAvgAttendMonth}
                          />
                        )}
                      </Observer>
                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Number of new children enrolled into the program"
                            placeHolder="Number of new children enrolled into the program"
                            onChangeText={proStore.setNumNewChildEnroll}
                            keyboardType="numeric"
                          />
                        )}
                      </Observer>
                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Number of children who have dropped out of the program"
                            placeHolder="Number of children who have dropped out of the program"
                            onChangeText={proStore.setNumChildDropped}
                            keyboardType="numeric"
                          />
                        )}
                      </Observer>
                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Number of children who are sick around the day of visit. 
                        What is the illness?"
                            placeHolder="Number of children who are sick around the day of visit. 
                        What is the illness?"
                            onChangeText={proStore.setNumChildSick}
                            keyboardType="numeric"
                          />
                        )}
                      </Observer>
                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Which numbered activity sheet was received this month?"
                            placeHolder="Which numbered activity sheet was received this month?"
                            onChangeText={proStore.setNumberedActivitySheet}
                          />
                        )}
                      </Observer>

                      <Observer>
                        {() => (
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
                        )}
                      </Observer>

                      <Observer>
                        {() => (
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
                        )}
                      </Observer>
                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.dovInputStyle}
                            textHeader="Date when the month's food supply was received"
                            rightIcon={AppSVGs.dob}
                            placeHolder="Date when the month's food supply was received"
                            hideInput={true}
                            onPress={showDatePicker2}
                            otherText={proStore.foodSupplyDate}
                          />
                        )}
                      </Observer>
                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Number of meals carried forward from the previous month"
                            placeHolder="Number of meals carried forward from the previous month"
                            onChangeText={proStore.setNoOfMealsCF}
                            keyboardType="numeric"
                          />
                        )}
                      </Observer>
                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Number of meals received this month"
                            placeHolder="Number of meals received this month"
                            onChangeText={proStore.setNoOfMealsReceive}
                            keyboardType="numeric"
                          />
                        )}
                      </Observer>

                      <Observer>
                        {() => (
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
                        )}
                      </Observer>

                      <Observer>
                        {() => (
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
                        )}
                      </Observer>

                      <Observer>
                        {() => (
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
                        )}
                      </Observer>

                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Additional observations or points discussed"
                            placeHolder="Additional observations or points discussed"
                            onChangeText={proStore.setAddObservations}
                          />
                        )}
                      </Observer>
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
                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Feedback from a teacher/social worker about highlighted children, program issues, positive feedback"
                            placeHolder="Feedback from a teacher/social worker about highlighted children, program issues, positive feedback"
                            onChangeText={proStore.setTeacherFeedback}
                          />
                        )}
                      </Observer>
                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Feedback from parents (if available)"
                            placeHolder="Feedback from parents (if available)"
                            onChangeText={proStore.setParentFeedback}
                          />
                        )}
                      </Observer>
                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Feedback from the children (food tastes, thoughts, activity sheets etc)"
                            placeHolder="Feedback from the children (food tastes, thoughts, activity sheets etc)"
                            onChangeText={proStore.setChildFeedback}
                          />
                        )}
                      </Observer>
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
                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Company name, Name of volunteer(s)"
                            placeHolder="Company name, Name of volunteer(s)"
                            onChangeText={proStore.setVolunteerName}
                          />
                        )}
                      </Observer>

                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <View style={{flex: 1, paddingRight: 10}}>
                          <Observer>
                            {() => (
                              <AppInput
                                textHeader="Duration of the volunteer session "
                                placeHolder="Hour"
                                value={proStore.volunteerHour}
                                parentStyle={styles.textInputStyle}
                                onPress={() => {
                                  handleBottomSheetClick('volunteerHour');
                                  handleIndex(3);
                                }}
                                rightIcon={AppSVGs.dropdown}
                              />
                            )}
                          </Observer>
                        </View>
                        <View style={{flex: 1, paddingLeft: 10}}>
                          <Observer>
                            {() => (
                              <AppInput
                                textHeader=" "
                                placeHolder="Minute"
                                value={proStore.volunteerMinute}
                                parentStyle={styles.textInputStyle}
                                onPress={() => {
                                  handleBottomSheetClick('volunteerMinute');
                                  handleIndex(3);
                                }}
                                rightIcon={AppSVGs.dropdown}
                              />
                            )}
                          </Observer>
                        </View>
                      </View>

                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Reason/objective for the volunteering session with Decimal"
                            placeHolder="Reason/objective for the volunteering session with Decimal"
                            onChangeText={proStore.setVolunteerReason}
                          />
                        )}
                      </Observer>

                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Any major learning(s)  and/or observations "
                            placeHolder="Any major learning(s)  and/or observations "
                            onChangeText={proStore.setLearnAndObserve}
                          />
                        )}
                      </Observer>
                      <Observer>
                        {() => (
                          <AppTextInput
                            parentStyle={styles.textInputStyle}
                            textHeader="Any other feedback"
                            placeHolder="Any other feedback"
                            onChangeText={proStore.setOtherFeedback}
                          />
                        )}
                      </Observer>
                    </>
                  }
                />
                <DashedLine
                  dashLength={5}
                  dashThickness={0.7}
                  dashColor={colors.gray}
                />

                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 1, paddingRight: 10}}>
                    <Observer>
                      {() => (
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
                      )}
                    </Observer>
                  </View>
                  <View style={{flex: 1, paddingLeft: 10}}>
                    <Observer>
                      {() => (
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
                      )}
                    </Observer>
                  </View>
                </View>
                <DashedLine
                  dashLength={5}
                  dashThickness={0.7}
                  dashColor={colors.gray}
                />

                <Observer>
                  {() => (
                    <AppImageUploadInput
                      title={'Photos for Monitoring'}
                      selectedImages={selectedImages}
                      onPress={proStore.togglePhotoBottomSheet}
                      removeImage={removeImage}
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
                  isLoading={proStore.isLoading}
                  onPress={proStore.sendData}
                  enabled={proStore.enableSubmit}
                />
              )}
            </Observer>
          </View>
        </KeyboardAvoidingView>
      </AppContainer>
      <DateTimePickerModal
        isVisible={showCalender}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />
      <DateTimePickerModal
        isVisible={showCalender2}
        mode="date"
        onConfirm={handleConfirm2}
        onCancel={hideDatePicker2}
        maximumDate={new Date()}
      />
      <Observer>
        {() => (
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
        )}
      </Observer>

      <Observer>
        {() => (
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
});
