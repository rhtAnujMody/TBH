import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {AppSVGs} from '../../assets';
import {colors, typography} from '../../theme';

type Props = {};

const AppImageUploadInput = ({}: Props) => {
  const [selectedImages, setSelectedImages] = useState([]);
  //   console.log(selectedImages, 'selectedImages');
  const selectImagesHandler = () => {
    ImagePicker.openPicker({
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
  };

  const removeImage = index => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const showUploadInput = selectedImages.length < 5;

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>UPLOAD PHOTO</Text>
      {showUploadInput && (
        <View style={styles.inputContainer}>
          <Pressable
            style={styles.innerContainer}
            onPress={selectImagesHandler}>
            <AppSVGs.uploadImage style={styles.icon} />
            <Text style={styles.iconText}>Upload Photo</Text>
          </Pressable>
        </View>
      )}
      {selectedImages.length > 0 && (
        <View style={styles.previewContainer}>
          {selectedImages.map((image, index) => (
            <View key={index} style={styles.previewImageContainer}>
              <Image source={{uri: image.path}} style={styles.previewImage} />
              <Pressable
                onPress={() => removeImage(index)}
                style={styles.cancelIcon}>
                <AppSVGs.close style={styles.closeIcon} />
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default AppImageUploadInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 16,
    height: 12,
    marginBottom: 8,
  },
  closeIcon: {
    width: 45,
    height: 45,
  },
  iconText: {
    ...typography.medium(8),
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 14,
    height: 64,
    marginBottom: 16,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.gray,
    borderWidth: 1,
    width: '92%',
    height: 52,
    borderStyle: 'dashed',
    borderRadius: 14,
  },
  previewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  previewImageContainer: {
    position: 'relative',
    width: '19%',
    marginBottom: 12,
  },
  previewImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 14,
  },
  cancelIcon: {
    position: 'absolute',
    top: -6,
    right: -6,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  textHeader: {
    ...typography.medium(10),
    marginBottom: 6,
  },
});
