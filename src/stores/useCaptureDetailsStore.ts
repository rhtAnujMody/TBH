import {useLocalObservable} from 'mobx-react-lite';
import {AppSVGs} from '../assets';
import Utility from '../utils/Utility';
import {runInAction} from 'mobx';
import {CaptureModal} from '../models/CaptureModal';
import AppStrings from '../utils/AppStrings';
import useApiService from '../network/useAPIService';
import axios from 'axios';
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
    partnerName: '',
    partnerID: '',
    location: '',
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
    selectedImages: [],
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
          cdStore.partnerName = value;
          cdStore.partnerID = id;
          cdStore.validateSubmit();
          break;

        case 'Location':
          cdStore.location = value;
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
    setPartnerName(value: string) {
      cdStore.partnerName = value;
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

    setLocation(value: string) {
      cdStore.location = value;
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
      /*if (!Utility.validateAlpha(cdStore.partner)) {
        return;
      }
      if (cdStore.partnerName == '') {
        return;
      }
      if (!Utility.validateAlphaNumericSpecial(cdStore.location)) {
        return;
      }*/
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
      //cdStore.selectedImages.length == 0

      cdStore.enableSubmit = true;
    },

    async handleImageUpload() {
      try {
        const formData = new FormData();

        formData.append('partner', 2);
        formData.append('age_group', 2);
        formData.append('duration', 62);
        formData.append('topics', 'abc');
        formData.append('participants_count', 2);
        formData.append('method_used', 'ABC');
        formData.append('conducted_by', 'abc');
        formData.append('feedback', 'abc');
        formData.append('beneficiary', 2);
        formData.append('visit_date', '2023-08-17');
        //formData.append('image_1', null);

        const response = await axios.post(
          'http://4693-2405-201-4041-b074-53da-6e1a-9112-50b3.ngrok-free.app/api/v1/accounts/nutrition-education/',
          formData,
          {
            headers: {
              'content-type': 'multipart/form-data',
            },
          },
        );

        console.log('Upload successful:', response.data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    },

    async sendData() {
      runInAction(() => {
        cdStore.isLoading = true;
      });
      cdStore.isLoading = true;

      try {
        const response = await request<CaptureModal>(
          'post',
          AppStrings.captureDetails,
          {
            partner: cdStore.partnerID, //
            age_group: cdStore.ageID, //
            duration: parseInt(cdStore.hour) * 60 + parseInt(cdStore.minute), //
            topics: cdStore.topicsCovered,
            participants_count: cdStore.totalNoOfParticipants, //
            method_used: cdStore.methodUsed,
            conducted_by: cdStore.sessionConductedBy,
            feedback: cdStore.feedbackFromParticipants,
            beneficiary: cdStore.beneficiarieID, //
            visit_date: cdStore.dov,
            image_1: null,
            image_2: null,
            image_3: null,
            image_4: null,
            image_5: null,
          },
        );
        if (response.success) {
          console.log(response);
          Utility.showToast(response.msg);
        } else {
          Utility.showToast(response.msg);
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

    // setSelectedImages(value: Image[]) {
    //   cdStore.selectedImages = value;
    // },
  }));

  return cdStore;
};

export default useCaptureDetailsStore;
