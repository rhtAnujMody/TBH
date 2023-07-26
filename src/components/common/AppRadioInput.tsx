import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
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
        {options.map(option => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.radioButton,
              {
                borderColor:
                  selectedOption === option.value
                    ? colors.palette.primary
                    : colors.gray,
              },
            ]}
            onPress={() => handleSelect(option.value)}>
            <option.iconUri
              width={30}
              height={30}
              fill={
                selectedOption === option.value
                  ? colors.palette.primary
                  : colors.gray
              }
            />
            <Text style={styles.radioButtonLabel}>{option.label}</Text>
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
});

export default AppRadioInput;
