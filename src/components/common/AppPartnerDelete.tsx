import React from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppSVGs} from '../../assets';
import {typography} from '../../theme';
import AppStrings from '../../utils/AppStrings';

type Props = {
  name: string;
  location: string;
  block: string;
  district: string;
  state: string;
  onPress: () => void;
};

type Rowtype = {
  name: string;
  value: string;
  id: number;
};

const AppPartnerDelete = ({
  name,
  location,
  block,
  district,
  state,
  onPress,
}: Props) => {
  const showAlert = () => {
    Alert.alert(AppStrings.delete, AppStrings.sureDelete, [
      {
        text: AppStrings.yes,
        onPress: onPress,
        style: 'cancel',
      },
      {text: AppStrings.no, onPress: () => {}},
    ]);
  };

  const rows: Rowtype[] = [
    {
      name: 'Name:',
      value: name,
      id: 1,
    },
    {
      name: 'Location:',
      value: location,
      id: 2,
    },
    {
      name: 'Block:',
      value: block,
      id: 3,
    },
    {
      name: 'District:',
      value: district,
      id: 4,
    },
    {
      name: 'State:',
      value: state,
      id: 5,
    },
  ];

  return (
    <Pressable style={styles.container}>
      <View style={styles.button}>
        {rows.map(item => {
          return (
            <View key={item.id} style={styles.rowContainer}>
              <View style={styles.rowTitle}>
                <Text style={styles.rowName}>{item.name}</Text>
              </View>
              <View style={styles.rowItem}>
                <Text>{item.value}</Text>
              </View>
            </View>
          );
        })}
      </View>
      <TouchableOpacity onPress={showAlert}>
        <AppSVGs.dustbin />
      </TouchableOpacity>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 10,
    marginTop: 10,
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
  button: {flex: 0.9},
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  rowTitle: {
    flex: 0.6,
  },
  rowItem: {
    flex: 1,
  },
  rowName: {
    ...typography.bold(15),
  },
});

export default AppPartnerDelete;
