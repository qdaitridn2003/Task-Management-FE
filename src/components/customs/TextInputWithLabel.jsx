import { styled } from 'nativewind';
import React, { useState } from 'react';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';

import { Icon } from './CustomIcon';
import { View, Text, TouchableOpacity, PaperTextInput } from './TailwindComponent';
import { TextInput } from 'react-native-paper';
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
  returnKeyType,
  notEditable,
  onBlur,
  autoCapitalize,
  style,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const errorStyle = error ? 'border-semanticRed' : 'border-transparent';

  const borderColor = error
    ? 'border-semanticRed'
    : isFocused
      ? 'border-primary'
      : 'border-transparent';

  return (
    <View tw="mb-4" style={style}>
      {label && <Text tw="mb-2 text-base font-bold">{label}</Text>}

      {/* <View tw="flex-1 flex-row"> */}
      <PaperTextInput
        theme={{ colors: { onSurfaceVariant: Color.neutral2 } }} // Placeholder color
        style={[styles.textInputStyle, multiline && { height: null, paddingVertical: 12 }]}
        outlineStyle={[styles.outlineStyle, error ? styles.errorOutlineStyle : null]}
        outlineColor="transparent"
        editable={!notEditable}
        multiline={multiline}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        mode="outlined"
        value={value}
        onBlur={onBlur}
        // onFocus={multiline ? }
        onChangeText={onChangeText}
        secureTextEntry={isPasswordVisible}
        right={
          <TextInput.Icon
            icon={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
            style={secureTextEntry ? null : { width: '0%' }}
            onPress={togglePasswordVisibility}
            color={Color.neutral2}
          />
        }
      />
      {/* </View> */}

      {error && (
        <View tw="flex-row items-center mt-2">
          <Icon source={require('../../assets/icons/ErrorOutline.png')} color={Color.semanticRed} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export const TextInputWithLabel = styled(CustomTextInput, 'px-5');

const styles = StyleSheet.create({
  textInputStyle: {
    height: 48,
    fontSize: 16,
    width: '100%',
  },
  errorOutlineStyle: {
    borderWidth: 2,
    borderColor: Color.semanticRed,
    borderRadius: 16,
  },
  outlineStyle: {
    backgroundColor: Color.neutral4,
    // borderColor: 'transparent',
    elevation: 3,
    borderRadius: 16,
  },
  errorText: {
    color: Color.semanticRed,
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
  },
});
