import {Observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  FlatList,
} from 'react-native';
import {AppContainer, AppUserDelete, Header} from '../components';
import {styles} from '../styles/formStyles';
import {useManageUsersStore} from '../stores';

type Props = {};

const ManageUserScreen = ({}: Props) => {
  const manageStore = useManageUsersStore();

  useEffect(() => {
    manageStore.getUsersList();
  }, []);

  const deleteUser = (id: number) => {
    manageStore.deleteUser(id);
  };

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
                <View style={[styles.container, {marginBottom: 20}]}>
                  <Text style={styles.headingText}>List of Users</Text>
                  <FlatList
                    data={manageStore.usersList}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => (
                      <AppUserDelete
                        name={item.name}
                        email={item.email}
                        phone={item.contact}
                        onPress={() => {
                          deleteUser(item.id);
                        }}
                      />
                    )}
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
