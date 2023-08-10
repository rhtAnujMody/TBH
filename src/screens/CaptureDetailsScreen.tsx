import {Observer} from 'mobx-react-lite';
import React, {useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppBottomSheet from '../components/common/AppBottomSheet';
import AppImageUploadInput from '../components/common/AppImageUploadInput';
import BottomSheet from '@gorhom/bottom-sheet/';
import DatePicker from 'react-native-date-picker';
import Header from '../components/common/Header';
import useCaptureDetailsStore from '../stores/useCaptureDetailsStore';
import Utility from '../utils/Utility';
import {AppSVGs} from '../assets';
import {AppButton, AppTextInput} from '../components';
import {AppBottomSheetDropdown} from '../components/common/AppBottomSheetDropdown';
import {colors} from '../theme';
import AppInput from '../components/common/AppInput';
import ImageCropPicker from 'react-native-image-crop-picker';

const CaptureDetailsScreen = () => {
  const cdStore = useCaptureDetailsStore();

  const onDOVPress = () => {
    cdStore.toggleDOVPicker();
  };

  const onConfirmDate = (date: Date) => {
    cdStore.setDOV(Utility.formatDate(date));
    cdStore.toggleDOVPicker();
  };

  const onCancelDate = () => {
    cdStore.toggleDOVPicker();
  };

  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const bottomSheetPhotoRef = useRef<BottomSheet | null>(null);

  const [selectedImages, setSelectedImages] = useState<Image[]>([]);

  const selectImagesHandler = () => {
    ImageCropPicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      maxFiles: 5 - selectedImages.length, // Limit the number of images to 5
    })
      .then(images =>
        setSelectedImages(prevSelectedImages =>
          prevSelectedImages.concat(images),
        ),
      )
      .catch(error => {
        console.log('Error selecting images:', error);
      });
    cdStore.togglePhotoBottomSheet();
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
    });
    cdStore.togglePhotoBottomSheet();
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

  const toggleLoader = () => {
    cdStore.toggleLoader();
  };

  return (
    <>
      <SafeAreaView style={styles.containerWidth}>
        <Header title={'Capture Details'} />
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding'})}
          style={styles.containerWidth}>
          <View style={styles.backgroundStyle}>
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
              <View style={styles.container}>
                <Observer>
                  {() => (
                    <AppTextInput
                      parentStyle={styles.dovInputStyle}
                      textHeader="DATE OF VISIT"
                      rightIcon={AppSVGs.dob}
                      placeHolder="Date Of Visit"
                      hideInput={true}
                      onPress={onDOVPress}
                      otherText={cdStore.dov}
                    />
                  )}
                </Observer>
                <Observer>
                  {() => (
                    <AppInput
                      onPress={() => {
                        handleBottomSheetClick('partner');
                        handleIndex(1);
                      }}
                      parentStyle={styles.textInputStyle}
                      value={cdStore.partner}
                      textHeader="Is this a New/ Existing Partner"
                      placeHolder="Is this a New/ Existing Partner"
                    />
                  )}
                </Observer>
                <AppTextInput
                  parentStyle={styles.textInputStyle}
                  textHeader="TOTAl NUMBER OF PARTICIPANTS"
                  placeHolder="Total number of participants"
                  onChangeText={cdStore.setTotalNoOfParticipants}
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
                    />
                  )}
                </Observer>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Observer>
                    {() => (
                      <AppInput
                        textHeader="HOUR"
                        placeHolder="hour"
                        value={cdStore.hour}
                        parentStyle={styles.textInputStyle}
                        onPress={() => {
                          handleBottomSheetClick('hour');
                          handleIndex(2);
                        }}
                      />
                    )}
                  </Observer>
                  <Observer>
                    {() => (
                      <AppInput
                        textHeader="MINUTE"
                        placeHolder="minute"
                        value={cdStore.minute}
                        parentStyle={styles.textInputStyle}
                        onPress={() => {
                          handleBottomSheetClick('minute');
                          handleIndex(3);
                        }}
                      />
                    )}
                  </Observer>
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
                  selectedImages={selectedImages}
                  onPress={cdStore.togglePhotoBottomSheet}
                  removeImage={removeImage}
                />
                <Observer>
                  {() => (
                    <AppButton
                      title="Save"
                      style={styles.buttonStyle}
                      isLoading={cdStore.isLoading}
                      onPress={toggleLoader}
                      // enabled={loginStore.isButtonEnabled}
                    />
                  )}
                </Observer>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <Observer>
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
        </Observer>
      </SafeAreaView>
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
            />
          </AppBottomSheet>
        )}
      </Observer>

      <Observer>
        {() => (
          <AppBottomSheet
            isVisible={cdStore.openPhotoBottomSheet}
            onClose={cdStore.togglePhotoBottomSheet}
            index={cdStore.index}
            ref={bottomSheetPhotoRef}>
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
                onPress={selectImagesHandler}>
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
    flex: 1,
    padding: 20,
  },
  contentContainerStyle: {
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FCFCFC',
  },
  containerWidth: {
    flex: 1,
  },
  backgroundStyle: {
    backgroundColor: colors.palette.primary,
  },
  textInputStyle: {
    backgroundColor: '#F7F7F7',
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 25,
  },
  buttonStyle: {
    marginTop: 10,
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
});
