import { styled } from 'nativewind';
import { View, Text } from './TailwindComponent';
import React from 'react';
import { RadioButton } from 'react-native-paper';

const CustomRadioButton = ({ label, onValueChange, gender }) => {
  return (
    <View tw="mb-1 px-5">
      {label && <Text tw="mb-1   text-base font-bold">{label}</Text>}
      <RadioButton.Group onValueChange={onValueChange} value={gender}>
        <View tw="flex flex-row items-center">
          <RadioButton.Item label="Nam" value="male" />
          <RadioButton.Item label="Nữ" value="female" />
        </View>
      </RadioButton.Group>
    </View>
  );
};

export const RadioButtonOptionGender = styled(CustomRadioButton);
