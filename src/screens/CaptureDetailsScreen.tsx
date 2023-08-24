import BottomSheet from '@gorhom/bottom-sheet/';
import {Observer} from 'mobx-react-lite';
import React, {useRef, useState, useEffect} from 'react';
import ImageCropPicker, {Image} from 'react-native-image-crop-picker';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import DashedLine from 'react-native-dashed-line';
import DatePicker from 'react-native-date-picker';
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
import useCaptureDetailsStore from '../stores/useCaptureDetailsStore';
import {colors, typography} from '../theme';
import Utility from '../utils/Utility';

const CaptureDetailsScreen = () => {
  const cdStore = useCaptureDetailsStore();

  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const [showCalender, setShowCalender] = useState(false);
  //const [selectedImages, setSelectedImages] = useState<Image[]>([]);

  const {openGallery, removeImage, takePhotoFromCamera, selectedImages} =
    useCamera(cdStore.togglePhotoBottomSheet);

  // useEffect(() => {
  //   requestPermission();
  //   // console.log(selectedImages[0].path);
  // }, []);

  // const requestPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.requestMultiple([
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
  //     ]);
  //     if (
  //       granted['android.permission.CAMERA'] &&
  //       granted['android.permission.READ_MEDIA_IMAGES']
  //     ) {
  //       console.log('You can use the camera');
  //     } else {
  //       console.log('Camera permission denied');
  //     }
  //   } catch (error) {
  //     console.log('permission error', error);
  //   }
  // };

  // const openGallery = () => {
  //   ImageCropPicker.openPicker({
  //     multiple: true,
  //     mediaType: 'photo',
  //     maxFiles: 5 - selectedImages.length, // Limit the number of images to 5
  //   })
  //     .then(images => {
  //       if (images.length + selectedImages.length > 5) {
  //         Alert.alert('Oops!', 'You can select max 5 images');
  //       }

  //       setSelectedImages(prevSelectedImages =>
  //         prevSelectedImages
  //           .concat(images)
  //           .slice(0, Math.min(prevSelectedImages.length + images.length, 5)),
  //       );
  //     })
  //     .catch(error => {
  //       console.log('Error selecting images:', error);
  //     });
  //   cdStore.togglePhotoBottomSheet();
  // };

  // const removeImage = (index: number) => {
  //   const updatedImages = [...selectedImages];
  //   updatedImages.splice(index, 1);
  //   setSelectedImages(updatedImages);
  // };

  // const takePhotoFromCamera = () => {
  //   ImageCropPicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then(image => {
  //     console.log(image);
  //     cdStore.togglePhotoBottomSheet();
  //   });
  //   //cdStore.togglePhotoBottomSheet();
  // };

  // const onConfirmDate = (date: Date) => {
  //   cdStore.setDOV(Utility.formatDate(date));

  //   cdStore.toggleDOVPicker();
  // };

  // const onCancelDate = () => {
  //   cdStore.toggleDOVPicker();
  // };

  const handleBottomSheetClick = (from: string) => {
    cdStore.toggleBottomSheet(from);
  };

  const hideBottomSheet = () => {
    cdStore.toggleBottomSheet();
  };

  const handleIndex = (value: number) => {
    cdStore.setIndex(value);
  };

  const toggleLoader = () => {
    cdStore.toggleLoader();
  };

  const showDatePicker = () => {
    setShowCalender(true);
  };

  const hideDatePicker = () => {
    setShowCalender(false);
  };

  const handleConfirm = (date: Date) => {
    cdStore.setDOV(Utility.formatDate(date));
    cdStore.validateSubmit();
    hideDatePicker();
  };

  return (
    <>
      <AppContainer>
        <Header title={'Nutrition Education'} />
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding'})}
          style={{flex: 1, backgroundColor: colors.palette.primary}}>
          <View style={styles.backgroundStyle}>
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
              <View style={styles.container}>
                <Text style={styles.headingText}>
                  Enter details related to the Nutrition Education event
                </Text>
                <Observer>
                  {() => (
                    <AppTextInput
                      parentStyle={styles.dovInputStyle}
                      textHeader="DATE OF VISIT"
                      rightIcon={AppSVGs.dob}
                      placeHolder="Date Of Visit"
                      hideInput={true}
                      onPress={showDatePicker}
                      otherText={cdStore.dov}
                    />
                  )}
                </Observer>

                <AppToggle
                  title={'Partner Details'}
                  children={
                    <>
                      <Observer>
                        {() => (
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
                        )}
                      </Observer>

                      <Observer>
                        {() =>
                          cdStore.partner == 'New' ? (
                            <>
                              <Observer>
                                {() => (
                                  <AppTextInput
                                    value={cdStore.newPartnerName}
                                    parentStyle={styles.textInputStyle}
                                    textHeader="NAME OF THE PARTNER"
                                    placeHolder="Name of the partner"
                                    onChangeText={cdStore.setNewPartnerName}
                                  />
                                )}
                              </Observer>

                              <Observer>
                                {() => (
                                  <AppTextInput
                                    value={cdStore.newLocation}
                                    parentStyle={styles.textInputStyle}
                                    textHeader="LOCATION"
                                    placeHolder="Location"
                                    onChangeText={cdStore.setNewLocation}
                                  />
                                )}
                              </Observer>

                              <Observer>
                                {() => (
                                  <AppTextInput
                                    value={cdStore.newBlock}
                                    parentStyle={styles.textInputStyle}
                                    textHeader="BLOCK"
                                    placeHolder="Block"
                                    onChangeText={cdStore.setNewBlock}
                                  />
                                )}
                              </Observer>

                              <Observer>
                                {() => (
                                  <AppTextInput
                                    value={cdStore.newDistrict}
                                    parentStyle={styles.textInputStyle}
                                    textHeader="District"
                                    placeHolder="District"
                                    onChangeText={cdStore.setNewDistrict}
                                  />
                                )}
                              </Observer>

                              <Observer>
                                {() => (
                                  <AppTextInput
                                    value={cdStore.newState}
                                    parentStyle={styles.textInputStyle}
                                    textHeader="STATE"
                                    placeHolder="State"
                                    onChangeText={cdStore.setNewState}
                                  />
                                )}
                              </Observer>
                            </>
                          ) : cdStore.partner == 'Existing' ? (
                            <>
                              <Observer>
                                {() => (
                                  <AppInput
                                    onPress={() => {
                                      handleBottomSheetClick('partnerName');
                                      handleIndex(1);
                                    }}
                                    parentStyle={styles.textInputStyle}
                                    value={cdStore.existPartnerName}
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
                                    value={cdStore.existLocation}
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
                                    value={cdStore.existBlock}
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
                                    value={cdStore.existDistrict}
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
                                    value={cdStore.existState}
                                    editable={false}
                                  />
                                )}
                              </Observer>
                            </>
                          ) : null
                        }
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
                  title={'Program Details'}
                  children={
                    <>
                      <AppTextInput
                        parentStyle={styles.textInputStyle}
                        textHeader="TOTAL NUMBER OF PARTICIPANTS"
                        placeHolder="Total number of participants"
                        onChangeText={cdStore.setTotalNoOfParticipants}
                        keyboardType={'numeric'}
                      />
                      <Observer>
                        {() => (
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
                        )}
                      </Observer>
                      <Observer>
                        {() => (
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
                                textHeader="PROGRAM DURATION"
                                placeHolder="Hour"
                                value={cdStore.hour}
                                parentStyle={styles.textInputStyle}
                                onPress={() => {
                                  handleBottomSheetClick('hour');
                                  handleIndex(2);
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
                                value={cdStore.minute}
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
                      <Observer>
                        {() => (
                          <AppImageUploadInput
                            title={'UPLOAD PHOTO'}
                            selectedImages={selectedImages}
                            onPress={cdStore.togglePhotoBottomSheet}
                            removeImage={removeImage}
                          />
                        )}
                      </Observer>
                    </>
                  }
                />
              </View>
            </ScrollView>

            <Observer>
              {() => (
                <AppButton
                  title="Save"
                  style={styles.buttonStyle}
                  width={'90%'}
                  isLoading={cdStore.isLoading}
                  onPress={() => cdStore.handleImageUpload(selectedImages)}
                  enabled={cdStore.enableSubmit}
                />
              )}
            </Observer>
          </View>
        </KeyboardAvoidingView>
        {/* <Observer>
          {() => (
            <DatePicker
              modal
              date={new Date()}
              open={cdStore.openDOVPicker}
              mode="date"
              onConfirm={onConfirmDate}
              onCancel={onCancelDate}
            />
          )}
        </Observer> */}
      </AppContainer>
      <Observer>
        {() => (
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
              setValue={() => {}}
            />
          </AppBottomSheet>
        )}
      </Observer>

      <DateTimePickerModal
        isVisible={showCalender}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />

      <Observer>
        {() => (
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

export default CaptureDetailsScreen;

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
