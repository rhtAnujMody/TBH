import React, {useCallback} from 'react';
import {
  Alert,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppSVGs} from '../../assets';
import {typography} from '../../theme';

type Props = {
  name: string;
  phone: string;
  email: string;
  onPress: () => void;
};

type Rowtype = {
  name: string;
  icon: React.FC;
  id: number;
};
const ITEM_HEIGHT = 100;

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

  const rows: Rowtype[] = [
    {
      name: name,
      icon: AppSVGs.name,
      id: 1,
    },
    {
      name: phone,
      icon: AppSVGs.phone,
      id: 2,
    },
    {
      name: email,
      icon: AppSVGs.email,
      id: 3,
    },
  ];
  const keyExtractor = useCallback((item: Rowtype) => item.id.toString(), []);

  const renderItem: ListRenderItem<Rowtype> = useCallback(
    ({item}) => (
      <View style={styles.rowContainer}>
        <item.icon />
        <Text style={styles.text}>{item.name}</Text>
      </View>
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
    <Pressable style={styles.container}>
      <View style={styles.button}>
        <FlatList
          data={rows}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          scrollEnabled
        />
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
    height: 100,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
  },
  text: {
    paddingLeft: 10,
    ...typography.regular(15),
  },
  button: {flex: 0.9},
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    height: 25,
  },
});

export default AppUserDelete;
