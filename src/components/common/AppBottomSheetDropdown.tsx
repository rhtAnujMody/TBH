import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppSVGs} from '../../assets';
import {FlatList} from 'react-native-gesture-handler';
import AppTextInput from './AppTextInput';
import Utility from '../../utils/Utility';

type Array = {
  name: string;
  id: string;
};

export type BottomSheetCard = {
  id: string;
  name: string;
};

type Props = {
  header: string;
  data: Array[];
  onPress?: () => void;
  onClose: () => void;
  onItemSelect: (header: string, value: string, id: string) => void;
  search?: boolean;
};

const AppBottomSheetDropdown = ({
  data,
  header,
  onPress,
  onItemSelect,
  search,
}: Props) => {
  const [showList, setShowList] = useState(data);
  const renderItem = ({item}: {item: BottomSheetCard}) => {
    return (
      <TouchableHighlight
        underlayColor="#eee"
        onPress={() => {
          onItemSelect(header, item.name, item.id);
        }}
        style={styles.itemContainer}>
        <Text>{item.name}</Text>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerStyle}>{header}</Text>
        <TouchableOpacity onPress={onPress}>
          <AppSVGs.close />
        </TouchableOpacity>
      </View>

      {search && (
        <View style={styles.searchContainer}>
          <AppTextInput
            parentStyle={styles.searchBar}
            icon={AppSVGs.search}
            placeHolder="Search"
            onChangeText={query => {
              setShowList(Utility.searchPartner(data, query));
            }}
          />
        </View>
      )}
      <FlatList
        data={showList}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AppBottomSheetDropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
  contentContainerStyle: {
    paddingBottom: 10,
    flexGrow: 1,
  },
  itemContainer: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 16,
  },
  headerStyle: {
    fontWeight: 'bold',
  },

  searchContainer: {marginHorizontal: 20},
  searchBar: {backgroundColor: '#eeeeee'},
});
