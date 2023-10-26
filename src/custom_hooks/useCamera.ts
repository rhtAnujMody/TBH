import {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import ImageCropPicker, {Image} from 'react-native-image-crop-picker';
import Utility from '../utils/Utility';
import AppStrings from '../utils/AppStrings';

const useCamera = () => {
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);

  useEffect(() => {
    requestPermission();
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
        console.log(AppStrings.canUseCamera);
      } else {
        console.log(AppStrings.cameraPermission);
      }
    } catch (error) {
      console.log(AppStrings.permissionError, error);
    }
  };

  const openGallery = () => {
    ImageCropPicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      maxFiles: 5 - selectedImages.length, // Limit the number of images to 5
    })
      .then(images => {
        if (selectedImages.length + images.length > 5) {
          Utility.showToast(AppStrings.maxImagesError);
          return;
        }
        setSelectedImages(prevSelectedImages =>
          prevSelectedImages.concat(images),
        );
      })
      .catch(error => {
        console.log(AppStrings.selectImagesError, error);
      });
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
      freeStyleCropEnabled: true,
    }).then(image => {
      setSelectedImages(prevSelectedImages => prevSelectedImages.concat(image));
    });
  };

  return {
    openGallery,
    removeImage,
    takePhotoFromCamera,
    selectedImages,
  };
};

export default useCamera;
