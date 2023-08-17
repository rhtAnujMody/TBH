import {useLocalObservable} from 'mobx-react-lite';
import {AppSVGs} from '../assets';
import authStore from './authStore';
import Utility from '../utils/Utility';

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
    partnerName: '',
    location: '',
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
    enableSubmit: false,
    beneficiarisOptions: [
      {id: 0, name: 'Children - Govt/Public School'},
      {id: 1, name: 'Children - Private School'},
      {id: 2, name: 'Children - Anganwadi'},
      {id: 3, name: 'Children - Balwadi'},
      {id: 4, name: 'Children - Shelter Home'},
      {id: 5, name: 'Children - Ashramshala'},
      {id: 6, name: 'Teachers - Govt/Public School'},
      {id: 7, name: 'Teachers - Private School'},
      {id: 8, name: 'Teachers - Anganwadi'},
      {id: 9, name: 'Teachers - Balwadi'},
      {id: 10, name: 'Teachers - Shelter Home'},
      {id: 11, name: 'Teachers - Ashramshala'},
      {id: 12, name: 'Parents'},
      {id: 13, name: 'Adolescents'},
      {id: 14, name: 'Women - Prenatal'},
      {id: 15, name: 'Women - Postnatal'},
      {id: 16, name: 'Women - Group'},
      {id: 17, name: 'Staff/Officers/Workers - ASHA'},
      {id: 18, name: 'Staff/Officers/Workers - Anganwadi'},
      {id: 19, name: 'Staff/Officers/Workers - Balwadi'},
      {id: 20, name: 'Staff/Officers/Workers - NGO'},
      {id: 21, name: 'Staff/Officers/Workers - Corporate'},
    ],
    partnerOptions: [
      {name: 'New', id: 'new'},
      {name: 'Existing', id: 'existing'},
    ],
    partnerNameList: [{name: 'Calvary Day Care Centre', id: '0'}],
    locationList: [
      {
        name: 'Ramabai',
        id: '0',
      },
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

    setValue(from: string, value: string) {
      cdStore.openBottomSheet = !cdStore.openBottomSheet;
      switch (from) {
        case 'Select Age':
          cdStore.age = value;
          cdStore.validateSubmit();
          break;
        case 'Is this a new/existing partner':
          cdStore.partner = value;
          cdStore.validateSubmit();
          break;
        case 'Name of the Partner':
          cdStore.partnerName = value;
          cdStore.validateSubmit();
          break;

        case 'Location':
          cdStore.location = value;
          cdStore.validateSubmit();
          break;
        case 'Target beneficiaries':
          cdStore.targetBeneficiaries = value;
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
    setLocation(value: string) {
      cdStore.location = value;
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
      console.log('hii');
      cdStore.enableSubmit = false;
      if (
        cdStore.dov == '' ||
        cdStore.partner == '' ||
        cdStore.partnerName == '' ||
        cdStore.location == '' ||
        cdStore.age == '' ||
        cdStore.totalNoOfParticipants == '' ||
        cdStore.targetBeneficiaries == '' ||
        cdStore.hour == '' ||
        cdStore.minute == '' ||
        cdStore.methodUsed == '' ||
        cdStore.topicsCovered == '' ||
        cdStore.sessionConductedBy == '' ||
        cdStore.feedbackFromParticipants == '' ||
        cdStore.selectedImages.length == 0
      ) {
        return;
      }
      cdStore.enableSubmit = true;
    },

    // setSelectedImages(value: Image[]) {
    //   cdStore.selectedImages = value;
    // },
  }));

  return cdStore;
};

export default useCaptureDetailsStore;
