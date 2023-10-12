import {runInAction} from 'mobx';
import {useLocalObservable} from 'mobx-react-lite';
import {useNavigation} from '@react-navigation/native';
import useApiService from '../network/useAPIService';
import Utility from '../utils/Utility';
import AppStrings from '../utils/AppStrings';
import authStore from './authStore';

type UserDetails = {
  id: number;
  name: string;
  email: string;
  contact: string;
  is_active: boolean;
};

const useManageUsersStore = () => {
  const {request} = useApiService();
  const navigation = useNavigation();
  const manageStore = useLocalObservable(() => ({
    usersList: [] as UserDetails[],

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
          });
        }
      } catch (err) {
        Utility.showToast(AppStrings.somethingWentWrong);
      } finally {
        runInAction(() => {});
      }
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
  }));

  return manageStore;
};

export default useManageUsersStore;
