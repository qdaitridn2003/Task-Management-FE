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
  onBlur,
}) => {
  return (
    <View tw="mb-4" style={style}>
      <Text tw="mb-2 text-base font-bold">Địa điểm</Text>
      <View tw="elevation overflow-hidden h-12 rounded-2xl flex-row items-center">
        <View
          tw={
            notEditable
              ? 'ml-4 h-12 justify-center items-center'
              : 'h-12 w-12 bg-primary justify-center items-center'
          }>
          <Icon
            source={require('../../assets/icons/Location.png')}
            color={notEditable ? Color.primary : Color.neutral4}
          />
        </View>

        <RNPaperTextInPut
          style={styles.textInputStyle}
          contentStyle={styles.contentStyle}
          underlineStyle={styles.underlineStyle}
          placeholderTextColor={Color.neutral2}
          editable={!notEditable}
          placeholder="Nhập địa điểm"
          autoCapitalize="none"
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          pointerEvents={notEditable ? 'none' : 'auto'} // Set pointerEvents based on notEditable
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
  textInputStyle: {
    flex: 1,
  },
  contentStyle: {
    paddingLeft: 8,
    backgroundColor: Color.neutral4,
    height: '100%',
  },
  underlineStyle: { flex: 1 },
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
