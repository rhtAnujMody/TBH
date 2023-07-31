import {useLocalObservable} from 'mobx-react-lite';
import {AppSVGs} from '../assets';

const useCaptureDetailsStore = () => {
  const cdStore = useLocalObservable(() => ({
    dov: '',
    openDOVPicker: false,
    openPartner: false,
    valuePartner: '',
    totalNoOfParticipants: '',
    methodUsed: '',
    topicsCovered: '',
    sessionConductedBy: '',
    feedbackFromParticipants: '',
    selectedImages: [],
    partnerOptions: [
      {label: 'New', value: 'new'},
      {label: 'Existing', value: 'existing'},
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

    toggleDOVPicker() {
      cdStore.openDOVPicker = !cdStore.openDOVPicker;
    },
    setDOV(value: string) {
      cdStore.dov = value;
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
