import React from 'react';
import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import {AppSVGs} from '../../assets';
import {typography} from '../../theme';

type Props = {
  name: string;
  phone: string;
  email: string;
  onPress: () => void;
};

const AppUserDelete = ({name, phone, email, onPress}: Props) => {
  const showAlert = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this user?', [
      {
        text: 'Yes',
        onPress: onPress,
        style: 'cancel',
      },
      {text: 'No', onPress: () => {}},
    ]);
  };
  return (
    <TouchableOpacity onPress={showAlert} style={styles.container}>
      <View>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{phone}</Text>
        <Text style={styles.text}>{email}</Text>
      </View>
      <AppSVGs.dustbin />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
  },
  text: {
    ...typography.regular(15),
  },
});

export default AppUserDelete;
