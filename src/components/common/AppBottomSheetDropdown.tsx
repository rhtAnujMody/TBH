import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppSVGs} from '../../assets';
import {FlatList} from 'react-native-gesture-handler';

type Array = {
  name: string;
  id: string;
};

type BottomSheetCard = {
  id: string;
  name: string;
};

type Props = {
  header: string;
  data: Array[];
  setValue: (item: string) => void;
  onPress?: () => void;
  onClose: () => void;
  onItemSelect: (header: string, value: string, id: string) => void;
};

export const AppBottomSheetDropdown = ({
  data,
  header,
  onPress,
  onItemSelect,
}: Props) => {
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
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={renderItem}
      />
    </View>
  );
};

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
});
