import {useLocalObservable} from 'mobx-react-lite';
import authStore from './authStore';
import {runInAction} from 'mobx';
import useApiService from '../network/useAPIService';
import AppStrings from '../utils/AppStrings';
import Utility from '../utils/Utility';

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
    partnerID: '',
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
      reportsStore.partnerID = id;
    },
    async saveData(id: string) {
      runInAction(() => {
        reportsStore.isLoading = true;
      });
      try {
        const response: any = await request(
          'post',
          AppStrings.generateReports,
          {
            partner_id: reportsStore.partnerID,
            start_date: reportsStore.fromDate,
            end_date: reportsStore.toDate,
            report_name: id,
          },
        );
        console.log(response);
        // if (response.success) {
        //   Utility.showToast(response.msg);
        // } else {
        //   Utility.showToast(response.msg);
        // }
      } catch (err) {
        Utility.showToast(AppStrings.somethingWentWrong);
      } finally {
        runInAction(() => {
          reportsStore.isLoading = false;
        });
      }
    },
  }));
  return reportsStore;
};

export default useReportsStore;
