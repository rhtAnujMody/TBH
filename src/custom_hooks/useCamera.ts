import {useEffect, useState} from 'react';
import ImageCropPicker, {Image} from 'react-native-image-crop-picker';
import {Alert, PermissionsAndroid} from 'react-native';
import Utility from '../utils/Utility';

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
        if (selectedImages.length + images.length > 5) {
          Utility.showToast('You cannot select more than 5 images');
          return;
        }
        setSelectedImages(prevSelectedImages =>
          prevSelectedImages.concat(images),
        );
      })
      .catch(error => {
        console.log('Error selecting images:', error);
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
