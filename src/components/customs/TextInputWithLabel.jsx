import React, { useState } from 'react';
import { styled } from 'nativewind';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';
import { Color } from '../../common';
import { Icon } from './CustomIcon';
import { View, Text } from './TailwindComponent';
import { TextInput as RNPaperTextInPut } from 'react-native-paper';

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
    <View tw="mb-2" style={style}>
      {label && <Text tw="mb-2 text-base font-bold">{label}</Text>}
      <View tw="mb-1   elevation overflow-hidden rounded-2xl">
        <StyledRNTextInput
          style={[
            styles.textInputStyle,
            { borderWidth: error ? 2 : 0, borderColor: error ? Color.semanticRed : 'transparent' },
          ]}
          selectionColor={'rgba(100, 80, 255, 0.5)'}
          editable={!notEditable}
          multiline={multiline}
          keyboardType={keyboardType}
          placeholder={placeholder}
          autoCapitalize="none"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPasswordVisible}
        />
      </View>
      {/* <RNPaperTextInPut
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
      /> */}
      {error && (
        <View tw="flex-row items-center">
          <Icon source={require('../../assets/icons/ErrorOutline.png')} color={Color.semanticRed} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export const TextInputWithLabel = styled(CustomTextInput);

const styles = StyleSheet.create({
  textInputStyle: {
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
