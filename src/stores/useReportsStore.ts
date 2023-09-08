import {useLocalObservable} from 'mobx-react-lite';
import authStore from './authStore';
import {runInAction} from 'mobx';
import useApiService from '../network/useAPIService';

const useReportsStore = () => {
  const {request} = useApiService();
  const partnerNameLocation = () => {
    return authStore.userData.partner_list.map(item => {
      return {
        name:
          item.name +
          ',' +
          '\n' +
          item.location +
          ',' +
          item.block +
          ',' +
          item.district +
          ',' +
          item.state,
        id: item.id,
      };
    });
  };
  const reportsStore = useLocalObservable(() => ({
    index: 3,
    bottomSheetArray: [] as any[],
    bottomSheetHeader: '',
    openBottomSheet: false,
    isLoading: false,
    enableSubmit: true,
    fromDate: '',
    toDate: '',
    partner: '',
    calenderID: '',
    showCalender: false,
    partnerNameList: partnerNameLocation(),

    toogleCalender() {
      reportsStore.showCalender = !reportsStore.showCalender;
    },

    setCalenderID(value: string) {
      reportsStore.calenderID = value;
    },
    setFromDate(value: string) {
      reportsStore.fromDate = value;
    },
    setToDate(value: string) {
      reportsStore.toDate = value;
    },
    toggleBottomSheet() {
      reportsStore.openBottomSheet = !reportsStore.openBottomSheet;
      reportsStore.bottomSheetHeader = 'Select Partner Name, Location';
      reportsStore.bottomSheetArray = reportsStore.partnerNameList;
    },
    setValue(from: string, value: string, id: string) {
      reportsStore.openBottomSheet = !reportsStore.openBottomSheet;
      const res = value.split(',');
      reportsStore.partner = res[0];
    },
    async saveData() {
      runInAction(() => {
        reportsStore.isLoading = true;
      });
    },
  }));
  return reportsStore;
};

export default useReportsStore;
