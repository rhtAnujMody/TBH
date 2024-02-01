import {Observer} from 'mobx-react-lite';
import React, {useCallback, useEffect} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {DashboardStackRootParamList} from '../navigation/DashboardStack';
import {AppSVGs} from '../assets';
import {
  AppChildDelete,
  AppContainer,
  AppPartnerDelete,
  AppTextInput,
  AppUserDelete,
  Header,
} from '../components';
import {useManageUsersStore} from '../stores';
import AppStrings from '../utils/AppStrings';
import {styles} from '../styles/formStyles';

type Props = {};
const ManageUserScreen = ({}: Props) => {
  const route =
    useRoute<RouteProp<DashboardStackRootParamList, 'ManageUsers'>>();
  const {id} = route.params;
  const manageStore = useManageUsersStore();

  useEffect(() => {
    switch (id) {
      case 1:
        manageStore.getUsersList();
        break;
      case 2:
        manageStore.getPartnerList();
        break;
      case 3:
        manageStore.getChildNameList();
        break;
    }
  }, []);

  const searchUser = (query: string) => {
    switch (id) {
      case 1:
        return manageStore.handleSearch(query);
      case 2:
        return manageStore.handlePartnerSearch(query);
      case 3:
        return manageStore.handleChildSearch(query);
    }
  };

  const renderData = () => {
    switch (id) {
      case 1:
        return manageStore.searchList;
      case 2:
        return manageStore.partnerSearchList;
      case 3:
        return manageStore.childSearchDetailsList;
    }
  };

  const renderTitle = () => {
    switch (id) {
      case 1:
        return AppStrings.listOfUsers;
      case 2:
        return AppStrings.listOfPartners;
      case 3:
        return AppStrings.listOfChildren;
    }
  };

  const renderHeading = () => {
    switch (id) {
      case 1:
        return AppStrings.manageUsersLabel;
      case 2:
        return AppStrings.ADMIN_MANAGE.managePartners;
      case 3:
        return AppStrings.ADMIN_MANAGE.manageChildren;
    }
  };

  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  const renderItem = ({item}) => {
    switch (id) {
      case 1:
        return (
          <AppUserDelete
            name={item.name}
            email={item.email}
            phone={item.contact}
            onPress={() => manageStore.deleteUser(item.id)}
          />
        );
      case 2:
        return (
          <AppPartnerDelete
            name={item.name}
            location={item.location}
            block={item.block}
            district={item.district}
            state={item.state}
            onPress={() => manageStore.deletePartner(item.id)}
          />
        );
      case 3:
        return (
          <AppChildDelete
            name={item.name}
            dob={item.dob}
            contact={item.contact}
            gender={item.gender}
            onPress={() => manageStore.deleteChild(item.id)}
          />
        );
    }
  };

  return (
    <Observer>
      {() => (
        <>
          <AppContainer>
            <Header title={renderHeading()} />
            <KeyboardAvoidingView
              behavior={Platform.select({ios: 'padding'})}
              style={styles.keyboardAwoidStyle}>
              <View style={styles.backgroundStyle}>
                <View style={[styles.container, styles.adminMarginBotton]}>
                  <Text style={styles.headingText}> {renderTitle()}</Text>
                  <AppTextInput
                    parentStyle={styles.adminSearch}
                    icon={AppSVGs.search}
                    placeHolder="Search"
                    onChangeText={searchUser}
                  />
                  <FlatList
                    data={renderData()}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    scrollEnabled
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </AppContainer>
        </>
      )}
    </Observer>
  );
};

export default ManageUserScreen;
