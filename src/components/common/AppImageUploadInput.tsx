import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
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
      maxFiles: 5, // Limit the number of images to 5
    })
      .then(images => setSelectedImages(images))
      .catch(error => {
        console.log('Error selecting images:', error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>UPLOAD PHOTO</Text>
      <View style={styles.inputContainer}>
        <Pressable style={styles.innerContainer} onPress={selectImagesHandler}>
          <AppSVGs.uploadImage style={styles.icon} />
          <Text style={styles.iconText}>Upload Photo</Text>
        </Pressable>
      </View>
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
