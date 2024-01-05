import React, { useState } from 'react';
import { styled } from 'nativewind';
import { StyleSheet } from 'react-native';
import { Color } from '../../common';
import { Icon } from './CustomIcon';
import { View, Text } from './TailwindComponent';
import { TextInput as RNPaperTextInPut } from 'react-native-paper';

export const CustomTextInput = ({
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
    <View tw="mb-2" style={style}>
      {label && <Text tw="mb-2 text-base font-bold">{label}</Text>}
      <RNPaperTextInPut
        editable={!notEditable}
        multiline={multiline}
        keyboardType={keyboardType}
        style={styles.textInputStyle}
        placeholderTextColor={Color.neutral2}
        placeholder={placeholder}
        contentStyle={styles.contentStyle}
        underlineStyle={styles.underlineStyle}
        outlineStyle={styles.outlineStyle}
        outlineColor={error ? Color.semanticRed : 'transparent'}
        autoCapitalize="none"
        label=""
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPasswordVisible}
        right={
          secureTextEntry && (
            <RNPaperTextInPut.Icon
              icon={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
              color={Color.neutral1}
              onPress={togglePasswordVisibility}
            />
          )
        }
      />
      {error && (
        <View tw="flex-row items-center">
          <Icon source={require('../../assets/icons/ErrorOutline.png')} color={Color.semanticRed} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

// export const TextInput = styled(CustomTextInput);

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
