import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, typography} from '../../theme';

type Option = {
  label: string;
  value: string;
  iconUri: JSX.ElementType;
};

type RadioButtonProps = {
  options: Option[];
  onSelect: (selectedValue: string) => void;
};

const AppRadioInput = ({options, onSelect}: RadioButtonProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (optionValue: string) => {
    setSelectedOption(optionValue);
    onSelect(optionValue);
  };

  return (
    <View style={styles.containerWidth}>
      <Text style={styles.textHeader}>GENDER</Text>
      <View style={styles.container}>
        {options.map(({value, iconUri: Icon, label}) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.radioButton,
              styles.selectedOption(selectedOption === value),
            ]}
            onPress={() => handleSelect(value)}>
            <Icon
              width={30}
              height={30}
              fill={
                selectedOption === value ? colors.palette.primary : colors.gray
              }
            />
            <Text style={styles.radioButtonLabel}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
  },
  containerWidth: {
    flex: 1,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 98,
    gap: 8,
    borderColor: colors.palette.primary,
    borderWidth: 1,
    borderRadius: 25,
    marginRight: 20,
  },
  radioButtonLabel: {
    ...typography.bold(12),
    marginLeft: 4,
  },
  textHeader: {
    ...typography.medium(10),
    marginBottom: 6,
  },
  selectedOption: (isSelected: boolean) => ({
    borderColor: isSelected ? colors.palette.primary : colors.gray,
  }),
});

export default AppRadioInput;
