import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppSVGs} from '../../assets';

type Array = {
  name: string;
  id: string;
};

type Props = {
  header: string;
  data: Array[];
  setValue: (item: string) => void;
  onPress?: () => void;
  onClose: () => void;
  onItemSelect: (header: string, value: string) => void;
};

export const AppBottomSheetDropdown = ({
  data,
  header,
  onPress,
  onItemSelect,
}: Props) => {
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
        contentContainerStyle={{
          paddingBottom: 10,
          flexGrow: 1,
        }}
        renderItem={({item}) => (
          <TouchableHighlight
            underlayColor="#eee"
            onPress={() => {
              onItemSelect(header, item.name);
            }}
            style={styles.itemContainer}>
            <Text>{item.name}</Text>
          </TouchableHighlight>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
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
