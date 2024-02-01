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
import {colors, typography} from '../../theme';
import AppStrings from '../../utils/AppStrings';

type Array = {
  name: string;
  id: string;
};

type BottomSheetCard = {
  id: string;
  name: string;
  dob: string;
  gender: string;
  doctor_observation: [];
};

type Props = {
  header: string;
  data: Array[];
  onPress?: () => void;
  onClose: () => void;
  onItemSelect: (
    header: string,
    value: string,
    id: string,
    doctor_observation: [],
  ) => void;
};

const AppBottomCell = ({data, header, onPress, onItemSelect}: Props) => {
  const renderItem = ({item}: {item: BottomSheetCard}) => {
    return (
      <TouchableHighlight
        underlayColor="#eee"
        onPress={() => {
          onItemSelect(header, item.name, item.id, item.doctor_observation);
        }}
        style={styles.itemContainer}>
        <>
          <View style={styles.cellStyle}>
            <Text style={styles.textHeading}>
              {AppStrings.signUpNamePlaceholder}
            </Text>
            <Text>:</Text>
            <Text style={styles.textResult}>{item.name}</Text>
          </View>
          <View style={styles.cellStyle}>
            <Text style={styles.textHeading}>{AppStrings.dobCaps}</Text>
            <Text>:</Text>
            <Text style={styles.textResult}>{item.dob}</Text>
          </View>
          <View style={styles.cellStyle}>
            <Text style={styles.textHeading}>
              {AppStrings.HEALTH_CAMP_SCREEN.gender}
            </Text>
            <Text>:</Text>
            <Text style={styles.textResult}>{item.gender}</Text>
          </View>
        </>
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

export default AppBottomCell;

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
  textHeading: {
    ...typography.medium(14),
    width: 80,
  },
  textResult: {
    paddingLeft: 10,
    ...typography.regular(14, colors.black),
  },
  cellStyle: {flexDirection: 'row', alignItems: 'center'},
});
