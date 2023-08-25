import {runInAction} from 'mobx';
import {useLocalObservable} from 'mobx-react-lite';
import {Image} from 'react-native-image-crop-picker';
import {AppSVGs} from '../assets';
import {CaptureModal} from '../models/CaptureModal';
import useApiService from '../network/useAPIService';
import AppStrings from '../utils/AppStrings';
import Utility from '../utils/Utility';
import authStore from './authStore';

const useCaptureDetailsStore = () => {
  const {request} = useApiService();
  const cdStore = useLocalObservable(() => ({
    dov: '',
    openDOVPicker: false,
    openPartner: false,
    isLoading: false,
    bottomSheetArray: [] as any[],
    bottomSheetHeader: '',
    openBottomSheet: false,
    openPhotoBottomSheet: false,
    partner: '',
    newPartnerName: '',
    newLocation: '',
    newBlock: '',
    newDistrict: '',
    newState: '',
    existPartnerName: '',
    existLocation: '',
    existBlock: '',
    existDistrict: '',
    existState: '',

    partnerID: '', //backend not accepting 0

    age: '',
    ageID: '',
    targetBeneficiaries: '',
    totalNoOfParticipants: '',
    methodUsed: '',
    topicsCovered: '',
    hour: '',
    minute: '',
    index: 2,
    sessionConductedBy: '',
    feedbackFromParticipants: '',
    enableSubmit: false,
    beneficiarisOptions: authStore.userData.beneficiary_list ?? [],
    partnerOptions: [
      {name: 'New', id: 'new'},
      {name: 'Existing', id: 'existing'},
    ],
    partnerNameList: authStore.userData.partner_list ?? [],
    locationList: [
      {
        name: 'Ramabai',
        id: '0',
      },
    ],
    photoOptions: [
      {name: 'Take a Photo', id: 'camera'},
      {name: 'Upload from Library', id: 'gallery'},
    ],
    hourOptions: Array.from({length: 12}, (_, index) => ({
      name: (index + 1).toString(),
      id: (index + 1).toString(),
    })),
    minuteOptions: Array.from({length: 60}, (_, index) => ({
      name: index.toString().padStart(2, '0'),
      id: index.toString(),
    })),
    ageOptions: [
      {name: '2.5 - 5 years', id: '0'},
      {name: '5-13 years', id: '1'},
      {name: '13- 18 years', id: '2'},
      {name: '18- 25 years', id: '3'},
      {name: '25- 40 years', id: '4'},
      {name: '40 years and above', id: '5'},
    ],
    options: [
      {
        label: 'Male',
        value: 'male',
        iconUri: AppSVGs.male,
      },
      {
        label: 'Female',
        value: 'female',
        iconUri: AppSVGs.female,
      },
      {
        label: 'Other',
        value: 'other',
        iconUri: AppSVGs.female,
      },
    ],

    toggleBottomSheet(from?: string) {
      cdStore.openBottomSheet = !cdStore.openBottomSheet;
      switch (from) {
        case 'age':
          cdStore.bottomSheetHeader = 'Select Age';
          cdStore.bottomSheetArray = cdStore.ageOptions;
          break;
        case 'partner':
          cdStore.bottomSheetHeader = 'Is this a new/existing partner';
          cdStore.bottomSheetArray = cdStore.partnerOptions;
          break;
        case 'partnerName':
          cdStore.bottomSheetHeader = 'Name of the Partner';
          cdStore.bottomSheetArray = cdStore.partnerNameList;
          break;

        case 'location':
          cdStore.bottomSheetHeader = 'Location';
          cdStore.bottomSheetArray = cdStore.locationList;
          break;
        case 'beneficiaries':
          cdStore.bottomSheetHeader = 'Target beneficiaries';
          cdStore.bottomSheetArray = cdStore.beneficiarisOptions;
          break;
        case 'hour':
          cdStore.bottomSheetHeader = 'Select hour';
          cdStore.bottomSheetArray = cdStore.hourOptions;
          break;
        case 'minute':
          cdStore.bottomSheetHeader = 'Select minute';
          cdStore.bottomSheetArray = cdStore.minuteOptions;
      }
    },

    toggleLoader() {
      cdStore.isLoading = !cdStore.isLoading;
      setTimeout(() => {
        cdStore.isLoading = !cdStore.isLoading;
        Utility.showToast('Form submitted successfully.');
      }, 5000);
    },

    togglePhotoBottomSheet() {
      cdStore.openPhotoBottomSheet = !cdStore.openPhotoBottomSheet;
    },

    toggleDOVPicker() {
      cdStore.openDOVPicker = !cdStore.openDOVPicker;
    },

    setDOV(value: string) {
      cdStore.dov = value;
    },

    setImage1(value: any) {
      cdStore.age = value;
    },

    setIndex(value: number) {
      cdStore.index = value;
    },

    setValue(from: string, value: string, id: string) {
      cdStore.openBottomSheet = !cdStore.openBottomSheet;
      switch (from) {
        case 'Select Age':
          cdStore.age = value;
          cdStore.ageID = id;
          cdStore.validateSubmit();
          break;
        case 'Is this a new/existing partner':
          cdStore.partner = value;
          cdStore.validateSubmit();
          break;
        case 'Name of the Partner':
          const res = value.split(',');
          cdStore.existPartnerName = res[0];
          cdStore.existLocation = res[1];
          cdStore.existBlock = res[2];
          cdStore.existDistrict = res[3];
          cdStore.existState = res[4];
          cdStore.partnerID = id;
          cdStore.validateSubmit();
          break;

        case 'Target beneficiaries':
          cdStore.targetBeneficiaries = value;
          cdStore.beneficiarieID = id;
          cdStore.validateSubmit();
          break;
        case 'Select hour':
          cdStore.hour = value;
          cdStore.validateSubmit();
          break;
        case 'Select minute':
          cdStore.minute = value;
          cdStore.validateSubmit();
      }
    },

    setAge(value: string) {
      cdStore.age = value;
      cdStore.validateSubmit();
    },

    setTotalNoOfParticipants(value: string) {
      cdStore.totalNoOfParticipants = value;
      cdStore.validateSubmit();
    },

    setNewPartnerName(value: string) {
      cdStore.newPartnerName = value;
      cdStore.validateSubmit();
    },
    setNewLocation(value: string) {
      cdStore.newLocation = value;
      cdStore.validateSubmit();
    },
    setNewBlock(value: string) {
      cdStore.newBlock = value;
      cdStore.validateSubmit();
    },
    setNewDistrict(value: string) {
      cdStore.newDistrict = value;
      cdStore.validateSubmit();
    },
    setNewState(value: string) {
      cdStore.newState = value;
      cdStore.validateSubmit();
    },

    setMethodUsed(value: string) {
      cdStore.methodUsed = value;
      cdStore.validateSubmit();
    },

    setTopicsCovered(value: string) {
      cdStore.topicsCovered = value;
      cdStore.validateSubmit();
    },

    setSessionCoveredBy(value: string) {
      cdStore.sessionConductedBy = value;
      cdStore.validateSubmit();
    },

    setFeedbackFromParticipants(value: string) {
      cdStore.feedbackFromParticipants = value;
      cdStore.validateSubmit();
    },

    validateSubmit() {
      cdStore.enableSubmit = false;
      if (cdStore.dov == '') {
        return;
      }

      if (cdStore.partner == '') {
        return;
      } else {
        if (cdStore.partner == 'New') {
          if (
            cdStore.newPartnerName == '' ||
            cdStore.newLocation == '' ||
            cdStore.newBlock == '' ||
            cdStore.newDistrict == '' ||
            cdStore.newState == ''
          ) {
            return;
          }
        } else {
          if (cdStore.existPartnerName == '') {
            return;
          }
        }
      }
      if (cdStore.age == '') {
        return;
      }
      if (!Utility.validateNumeric(cdStore.totalNoOfParticipants)) {
        return;
      }
      if (cdStore.targetBeneficiaries == '') {
        return;
      }
      if (cdStore.hour == '') {
        return;
      }
      if (cdStore.minute == '') {
        return;
      }
      if (!Utility.validateAlphaNumericSpecial(cdStore.methodUsed)) {
        return;
      }
      if (!Utility.validateAlphaNumericSpecial(cdStore.topicsCovered)) {
        return;
      }
      if (!Utility.validateAlphaNumericSpecial(cdStore.sessionConductedBy)) {
        return;
      }
      if (
        !Utility.validateAlphaNumericSpecial(cdStore.feedbackFromParticipants)
      ) {
        return;
      }
      //  if(selectedImages.length==0){
      //   return;
      //  }
      //cdStore.selectedImages.length == 0

      cdStore.enableSubmit = true;
    },

    async handleImageUpload(selectedImages: Image[]) {
      console.log(selectedImages, 'images');
      runInAction(() => {
        cdStore.isLoading = true;
      });
      cdStore.isLoading = true;
      try {
        const formData = new FormData();

        if (this.partner == 'New') {
          formData.append(
            'partner_details',
            JSON.stringify({
              name: cdStore.newPartnerName,
              location: cdStore.newLocation,
              block: cdStore.newBlock,
              district: cdStore.newDistrict,
              state: cdStore.newState,
            }),
          );
          formData.append('partner', '');
        } else {
          formData.append('partner', cdStore.partnerID);
        }

        formData.append('age_group', cdStore.ageID);
        formData.append(
          'duration',
          parseInt(cdStore.hour) * 60 + parseInt(cdStore.minute),
        );
        formData.append('topics', cdStore.topicsCovered);
        formData.append('participants_count', cdStore.totalNoOfParticipants);
        formData.append('method_used', cdStore.methodUsed);
        formData.append('conducted_by', cdStore.sessionConductedBy);
        formData.append('feedback', cdStore.feedbackFromParticipants);
        formData.append('beneficiary', cdStore.beneficiarieID);
        formData.append('visit_date', cdStore.dov);

        for (let i = 0; i < Math.min(selectedImages.length, 5); i++) {
          formData.append(`image_${i + 1}`, {
            uri: selectedImages[i].path,
            type: selectedImages[i].mime,
            name: selectedImages[i].path.split('/').pop(),
          });
        }

        const responseJson = await request<CaptureModal>(
          'post',
          AppStrings.captureDetails,
          formData,
          {
            'Content-Type': 'multipart/form-data;',
          },
        );

        if (responseJson.success) {
          console.log(responseJson, 'response from server');
          Utility.showToast(responseJson.msg);
        } else {
          Utility.showToast(responseJson.msg);
        }
      } catch (err) {
        Utility.showToast('Something went wrong');
        console.log(err);
      } finally {
        runInAction(() => {
          cdStore.isLoading = false;
        });
      }
    },
  }));

  return cdStore;
};

export default useCaptureDetailsStore;