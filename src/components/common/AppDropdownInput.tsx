import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {AppSVGs} from '../../assets';

type Option = {
  option: string;
};

type Props = {
  selectedValue: string;
  options: Option[];
  onSelect: (selectedValue: string) => void;
};

const AppDropdownInput = ({selectedValue, options, onSelect}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = option => {
    setModalVisible(false);
    onSelect(option);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.inputContainer}>
        <Text style={styles.selectedValue}>{selectedValue}</Text>
        <AppSVGs.dropdown size={16} style={styles.arrowIcon} />
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(option)}
              style={styles.optionItem}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 'auto',
    marginVertical: 'auto',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    borderRadius: 8,
  },
  selectedValue: {
    flex: 1,
  },
  arrowIcon: {
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optionItem: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default AppDropdownInput;
