import {useLocalObservable} from 'mobx-react-lite';
import {AppSVGs} from '../assets';
import authStore from './authStore';

const useCaptureDetailsStore = () => {
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
    age: '',
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
    partnerOptions: [
      {name: 'New', id: 'new'},
      {name: 'Existing', id: 'existing'},
    ],
    photoOptions: [{name: 'Take a Photo'}, {name: 'Upload from Library'}],
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
        case 'beneficiaries':
          cdStore.bottomSheetHeader = 'Target beneficiaries';
          cdStore.bottomSheetArray = authStore.userData.beneficiary_list;
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

    setValue(from: string, value: string) {
      cdStore.openBottomSheet = !cdStore.openBottomSheet;
      switch (from) {
        case 'Select Age':
          cdStore.age = value;
          break;
        case 'Is this a new/existing partner':
          cdStore.partner = value;
          break;
        case 'Target beneficiaries':
          cdStore.targetBeneficiaries = value;
          break;
        case 'Select hour':
          cdStore.hour = value;
          break;
        case 'Select minute':
          cdStore.minute = value;
      }
    },

    setAge(value: string) {
      cdStore.age = value;
    },

    setTotalNoOfParticipants(value: string) {
      cdStore.totalNoOfParticipants = value;
    },

    setMethodUsed(value: string) {
      cdStore.methodUsed = value;
    },

    setTopicsCovered(value: string) {
      cdStore.topicsCovered = value;
    },

    setSessionCoveredBy(value: string) {
      cdStore.sessionConductedBy = value;
    },

    setFeedbackFromParticipants(value: string) {
      cdStore.feedbackFromParticipants = value;
    },

    // setSelectedImages(value: Image[]) {
    //   cdStore.selectedImages = value;
    // },
  }));

  return cdStore;
};

export default useCaptureDetailsStore;
