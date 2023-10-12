import {runInAction} from 'mobx';
import {useLocalObservable} from 'mobx-react-lite';
import {useNavigation} from '@react-navigation/native';
import useApiService from '../network/useAPIService';
import Utility from '../utils/Utility';
import AppStrings from '../utils/AppStrings';
import authStore from './authStore';
import {UserDetails} from '../models';

const useManageUsersStore = () => {
  const {request} = useApiService();
  const navigation = useNavigation();
  const manageStore = useLocalObservable(() => ({
    usersList: [] as UserDetails[],
    searchList: [] as UserDetails[],

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

    handleSearch(query: string) {
      const formattedQuery = query.toLowerCase();
      const filteredData = manageStore.customFilter(
        manageStore.usersList,
        (user: UserDetails) => {
          return manageStore.contains(user, formattedQuery);
        },
      );
      manageStore.searchList = filteredData;
    },

    //Our own custom Filter function instead of lodash filter
    customFilter(
      collection: UserDetails[],
      predicate: (user: UserDetails) => {},
    ) {
      const filteredArray = [];
      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i])) {
          filteredArray.push(collection[i]);
        }
      }

      return filteredArray;
    },

    contains({name, email, contact}: any, query: string) {
      if (
        name.includes(query) ||
        email.includes(query) ||
        contact.includes(query)
      ) {
        return true;
      }
      return false;
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
