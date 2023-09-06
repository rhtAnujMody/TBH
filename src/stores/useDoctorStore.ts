import {useLocalObservable} from 'mobx-react-lite';
const useDoctorStore = () => {
  const doctorStore = useLocalObservable(() => ({
    index: 1,
    bottomSheetArray: [] as any[],
    bottomSheetHeader: '',
    openBottomSheet: false,
    hospital: '',
    action: '',
    headBox: Array(15).fill(false) as boolean[],
    eyeBox: Array(15).fill(false) as boolean[],
    mouthBox: Array(15).fill(false) as boolean[],
    skinBox: Array(15).fill(false) as boolean[],
    nailsBox: Array(15).fill(false) as boolean[],
    bodyBox: Array(15).fill(false) as boolean[],
    hospitalOptions: [
      {name: 'Yes', id: '1'},
      {name: 'No', id: '2'},
    ],
    setAction(value: string) {
      doctorStore.action = value;
    },
    toggleBottomSheet(from?: string) {
      doctorStore.openBottomSheet = !doctorStore.openBottomSheet;
      switch (from) {
        case 'hospital':
          doctorStore.bottomSheetHeader = 'Referred to Hospital/ Medical Care';
          doctorStore.bottomSheetArray = doctorStore.hospitalOptions;
          break;
      }
    },
    setValue(from: string, value: string, id: string) {
      doctorStore.openBottomSheet = !doctorStore.openBottomSheet;
      switch (from) {
        case 'Referred to Hospital/ Medical Care':
          doctorStore.hospital = value;
          break;
      }
    },
  }));
  return doctorStore;
};

export default useDoctorStore;
