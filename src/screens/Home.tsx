import React from 'react';
import {Button, View} from 'react-native';
import {authStore} from '../stores';

type Props = {};

export default function Home({}: Props) {
  const logout = () => {
    authStore.logout();
  };
  return (
    <View>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
