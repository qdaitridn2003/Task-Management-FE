import React, { useState } from 'react';
import { styled } from 'nativewind';
import { StyleSheet } from 'react-native';
import { Color } from '../../common';
import { Icon } from './CustomIcon';
import { View, Text, TextInput } from './TailwindComponent';
import { TextInput as RNPaperTextInPut } from 'react-native-paper';

const CustomTextInput = ({
  value,
  onChangeText,
  error,
  placeholder,
  multiline,
  keyboardType,
  notEditable,
  style,
}) => {
  return (
    <View tw="mb-4" style={style}>
      <Text tw="mb-2 text-base font-bold">Địa điểm</Text>
      <View tw="elevation overflow-hidden h-12 rounded-2xl flex-row items-center">
        <View tw="h-12 w-12 bg-primary justify-center items-center">
          <Icon source={require('../../assets/icons/Location.png')} color={Color.neutral4} />
        </View>

        <TextInput
          tw="ml-2"
          placeholder="Nhập địa điểm"
          autoCapitalize="none"
          value={value}
          onChangeText={onChangeText}
        />

        {error && (
          <View tw="flex-row items-center">
            <Icon
              source={require('../../assets/icons/ErrorOutline.png')}
              color={Color.semanticRed}
            />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export const LocationTextInput = styled(CustomTextInput);

const styles = StyleSheet.create({
  textInputStyle: {},
  contentStyle: {
    paddingHorizontal: 20,
    backgroundColor: Color.neutral4,
    borderRadius: 16,
    height: 48,
  },
  underlineStyle: {},
  outlineStyle: {
    height: 48,
    borderRadius: 16,
    elevation: 3,
    borderWidth: 2,
  },
  errorText: {
    color: Color.semanticRed,
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
  },
});
