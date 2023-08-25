import {useEffect, useState} from 'react';
import ImageCropPicker, {Image} from 'react-native-image-crop-picker';
import {PermissionsAndroid} from 'react-native';

const useCamera = (togglePhotoBottomSheet: any) => {
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);
  //const cdStore = useCaptureDetailsStore(); //mobx instantiates diffrent stores for different screens

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
        setSelectedImages(prevSelectedImages =>
          prevSelectedImages.concat(images),
        );
      })
      .catch(error => {
        console.log('Error selecting images:', error);
      });
    togglePhotoBottomSheet();
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
    togglePhotoBottomSheet();
  };

  return {
    openGallery,
    removeImage,
    takePhotoFromCamera,
    selectedImages,
  };
};

export default useCamera;