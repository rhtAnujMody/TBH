import {useLocalObservable} from 'mobx-react-lite';
import authStore from './authStore';
import {runInAction} from 'mobx';
import useApiService from '../network/useAPIService';
import AppStrings from '../utils/AppStrings';
import Utility from '../utils/Utility';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CustomReportsStackRootParamList} from '../navigation/CustomReportsStack';
import {useNavigation} from '@react-navigation/native';
import {writeFile, DownloadDirectoryPath} from 'react-native-fs';
import XLSX from 'xlsx';

const useReportsStore = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<CustomReportsStackRootParamList>>();
  const DDP = DownloadDirectoryPath + '/';
  const output = (str: any) => str;
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
    enableSubmit: false,
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
      reportsStore.validateSubmit();
    },
    setToDate(value: string) {
      reportsStore.toDate = value;
      reportsStore.validateSubmit();
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
      reportsStore.validateSubmit();
    },

    validateSubmit() {
      reportsStore.enableSubmit = false;

      if (reportsStore.fromDate === '') {
        return;
      }
      if (reportsStore.toDate === '') {
        return;
      }
      if (reportsStore.partner === '') {
        return;
      }

      reportsStore.enableSubmit = true;
    },

    async exportDataToExcel(res: string, id: string) {
      const test = `${res}`;
      const lines = test.split('\n');
      const headerLine = lines[0].split(',');
      const data1 = lines.slice(1).map(line => {
        const values = line.split(',');
        return headerLine.reduce((obj: any, key, index) => {
          obj[key] = values[index];
          return obj;
        }, {});
      });
      let ws = XLSX.utils.json_to_sheet(data1);
      let wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Users');
      const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
      const file = DDP + id + Date.now() + '.xlsx';

      writeFile(file, output(wbout), 'ascii')
        .then((r: any) => {
          Utility.showToast('Excel File downloaded');
          Utility.logData('Success');
        })
        .catch((e: any) => {
          Utility.logData(`Error: ${e}`);
        });
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
        reportsStore.exportDataToExcel(response, id);
        navigation.goBack();
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
