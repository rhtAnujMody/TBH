import {Observer} from 'mobx-react-lite';
import React, {useCallback, useEffect} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  Text,
  View,
} from 'react-native';
import {AppSVGs} from '../assets';
import {AppContainer, AppTextInput, AppUserDelete, Header} from '../components';
import {UserDetails} from '../models';
import {useManageUsersStore} from '../stores';
import {styles} from '../styles/formStyles';

type Props = {};
const ITEM_HEIGHT = 100;
const ManageUserScreen = ({}: Props) => {
  const manageStore = useManageUsersStore();

  useEffect(() => {
    manageStore.getUsersList();
  }, []);

  const deleteUser = (id: number) => {
    manageStore.deleteUser(id);
  };

  const searchUser = (query: string) => {
    manageStore.handleSearch(query);
  };

  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  const renderItem: ListRenderItem<UserDetails> = useCallback(
    ({item}) => (
      <AppUserDelete
        name={item.name}
        email={item.email}
        phone={item.contact}
        onPress={() => deleteUser(item.id)}
      />
    ),
    [],
  );

  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <Observer>
      {() => (
        <>
          <AppContainer>
            <Header title={'Manage Users'} />
            <KeyboardAvoidingView
              behavior={Platform.select({ios: 'padding'})}
              style={styles.keyboardAwoidStyle}>
              <View style={styles.backgroundStyle}>
                <View style={[styles.container, styles.adminMarginBotton]}>
                  <Text style={styles.headingText}>List of Users</Text>
                  <AppTextInput
                    parentStyle={styles.adminSearch}
                    icon={AppSVGs.search}
                    placeHolder="Search"
                    onChangeText={searchUser}
                  />
                  <FlatList
                    data={manageStore.searchList}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    getItemLayout={getItemLayout}
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
