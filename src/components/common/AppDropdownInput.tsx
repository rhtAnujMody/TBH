import React, {Dispatch} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppSVGs} from '../../assets';
import DropDownPicker from 'react-native-dropdown-picker';
import {colors, typography} from '../../theme';

type SetStateValue<S> = (prevState: S) => S;
type SetStateCallback<S> = (prevState: S) => S;

type Props = {
  open: boolean;
  value: string | null;
  textHeader: string;
  items: Array<{label: string; value: string}>;
  setOpen: Dispatch<SetStateValue<boolean>>;
  setValue: Dispatch<SetStateCallback<string | null | any>>;
  setItems: Dispatch<SetStateCallback<any[]>>;
};

const ArrowDownIconComponent = () => {
  return <AppSVGs.dropdown style={styles.arrowDownIcon} />;
};

const AppDropdownInput = ({
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
  textHeader,
}: Props) => {
  return (
    <View style={styles.containerWidth}>
      <Text style={styles.textHeader}>{textHeader}</Text>
      <View style={styles.container}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          ArrowDownIconComponent={ArrowDownIconComponent}
          listMode="SCROLLVIEW"
          dropDownContainerStyle={styles.dropDownContainerStyle}
          style={styles.dropdownStyle}
          textStyle={styles.textStyle}
          placeholderStyle={styles.placeholderStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
  },
  containerWidth: {
    flex: 1,
  },
  textHeader: {
    ...typography.medium(10),
    marginBottom: 6,
  },
  arrowDownIcon: {
    marginRight: 4,
  },
  dropDownContainerStyle: {
    position: 'relative',
    backgroundColor: '#F7F7F7',
    borderColor: colors.gray,
    borderRadius: 30,
    top: 0,
  },
  placeholderStyle: {
    color: '#B1B1B1',
    marginLeft: 10,
  },
  dropdownStyle: {
    borderRadius: 30,
    borderColor: colors.gray,
    backgroundColor: '#F7F7F7',
  },
  textStyle: {
    paddingLeft: 10,
  },
});

export default AppDropdownInput;
