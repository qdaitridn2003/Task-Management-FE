import { styled } from 'nativewind';
import React, { useState } from 'react';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';

import { Icon } from './CustomIcon';
import { View, Text, TouchableOpacity } from './TailwindComponent';
import { Color } from '../../common';

const StyledRNTextInput = styled(RNTextInput);

const CustomTextInput = ({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry,
  placeholder,
  multiline,
  keyboardType,
  notEditable,
  style,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View tw="mb-4" style={style}>
      {label && <Text tw="mb-2 text-base font-bold">{label}</Text>}
      <View
        tw={
          error
            ? 'border-2 border-semanticRed mb-1 flex-row items-center elevation overflow-hidden rounded-2xl'
            : 'mb-1 flex-row items-center elevation overflow-hidden rounded-2xl'
        }>
        <StyledRNTextInput
          style={styles.textInputStyle}
          selectionColor="rgba(100, 80, 255, 0.5)"
          editable={!notEditable}
          multiline={multiline}
          keyboardType={keyboardType}
          placeholder={placeholder}
          autoCapitalize="none"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPasswordVisible}
        />
        {secureTextEntry && (
          <TouchableOpacity tw="mr-4" onPress={togglePasswordVisibility}>
            <Icon
              source={
                isPasswordVisible
                  ? require('../../assets/icons/Visibility.png')
                  : require('../../assets/icons/VisibilityOff.png')
              }
              color={Color.neutral1}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <View tw="flex-row items-center">
          <Icon source={require('../../assets/icons/ErrorOutline.png')} color={Color.semanticRed} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export const TextInputWithLabel = styled(CustomTextInput, 'mx-5');

const styles = StyleSheet.create({
  textInputStyle: {
    flex: 1,
    borderRadius: 16,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  contentStyle: {
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    borderRadius: 16,
    height: 48,
    marginBottom: 8,
  },
  underlineStyle: {
    backgroundColor: 'transparent',
  },
  outlineStyle: {
    backgroundColor: Color.neutral4,
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
