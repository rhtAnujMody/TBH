import {useLocalObservable} from 'mobx-react-lite';
import {AppSVGs} from '../assets';

const useCaptureDetailsStore = () => {
  const cdStore = useLocalObservable(() => ({
    partnerName: '',
    dob: '',
    openDOBPicker: false,
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

    toggleDOBPicker() {
      cdStore.openDOBPicker = !cdStore.openDOBPicker;
    },
    setDOB(value: string) {
      cdStore.dob = value;
    },
  }));

  return cdStore;
};

export default useCaptureDetailsStore;
