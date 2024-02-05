import {runInAction} from 'mobx';
import {useLocalObservable} from 'mobx-react-lite';
import {useNavigation} from '@react-navigation/native';
import useApiService from '../network/useAPIService';
import Utility from '../utils/Utility';
import AppStrings from '../utils/AppStrings';
import authStore from './authStore';
import {UserDetails, PartnerList, ChildList} from '../models';

const useManageUsersStore = () => {
  const {request} = useApiService();
  const navigation = useNavigation();
  const manageStore = useLocalObservable(() => ({
    usersList: [] as UserDetails[],
    searchList: [] as UserDetails[],
    partnerNameList: [] as PartnerList[],
    partnerSearchList: [] as PartnerList[],
    childDetailsList: [] as ChildList[],
    childSearchDetailsList: [] as ChildList[],

    async getUsersList() {
      runInAction(() => {});
      try {
        const response: any = await request(
          'get',
          AppStrings.manageUsers(authStore.userData.id),
        );
        if (response.success) {
          runInAction(() => {
            manageStore.usersList = response.data;
            manageStore.searchList = response.data;
          });
        }
      } catch (err) {
        Utility.showToast(AppStrings.somethingWentWrong);
      } finally {
        runInAction(() => {});
      }
    },

    async getPartnerList() {
      runInAction(() => {});
      try {
        const response: any = await request('get', AppStrings.managePartner);
        if (response.success) {
          runInAction(() => {
            manageStore.partnerNameList = response.data;
            manageStore.partnerSearchList = response.data;
          });
        }
      } catch (err) {
        Utility.showToast(AppStrings.somethingWentWrong);
      } finally {
        runInAction(() => {});
      }
    },

    async getChildNameList() {
      runInAction(() => {});
      try {
        const response: any = await request('get', AppStrings.manageChild);
        if (response.success) {
          runInAction(() => {
            manageStore.childDetailsList = response.data;
            manageStore.childSearchDetailsList = response.data;
          });
        }
      } catch (err) {
        Utility.showToast(AppStrings.somethingWentWrong);
      } finally {
        runInAction(() => {});
      }
    },

    handlePartnerSearch(query: string) {
      manageStore.partnerSearchList = Utility.searchQuery(
        query,
        manageStore.partnerNameList,
      );
    },

    handleChildSearch(query: string) {
      manageStore.childSearchDetailsList = Utility.searchQuery(
        query,
        manageStore.childDetailsList,
      );
    },

    handleSearch(query: string) {
      manageStore.searchList = Utility.searchQuery(
        query,
        manageStore.usersList,
      );
    },

    async deleteUser(id: number) {
      try {
        const response: any = await request('post', AppStrings.deleteUsers, {
          user_id: id,
          agent_id: authStore.userData.id,
        });

        if (response.success) {
          Utility.showToast(response.msg);
        }
      } catch (err) {
        Utility.showToast(AppStrings.somethingWentWrong);
      } finally {
        navigation.goBack();
      }
    },

    async deleteChild(id: number) {
      try {
        const response: any = await request('post', AppStrings.manageChild, {
          child_id: id,
        });

        if (response.success) {
          Utility.showToast(response.msg);
        }
      } catch (err) {
        Utility.showToast(AppStrings.somethingWentWrong);
      } finally {
        navigation.goBack();
      }
    },

    async deletePartner(id: number) {
      try {
        const response: any = await request('post', AppStrings.managePartner, {
          partner: id,
        });

        if (response.success) {
          Utility.showToast(response.msg);
        }
      } catch (err) {
        Utility.showToast(AppStrings.somethingWentWrong);
      } finally {
        navigation.goBack();
      }
    },
  }));

  return manageStore;
};

export default useManageUsersStore;
