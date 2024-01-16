import React, { useState } from 'react';
import { styled } from 'nativewind';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Color } from '../../common';
import { Icon } from './CustomIcon';
import { View, Text, TextInput, Image, TouchableOpacity } from './TailwindComponent';
import { TextInput as RNPaperTextInPut } from 'react-native-paper';

const CustomTextInput = ({
  value,
  onChangeText,
  error,
  source,
  notEditable,
  style,
  onBlur,
  onPress,
  type = 'client',
}) => {
  return (
    <View tw="mb-4" style={style}>
      <Text tw="mb-2 text-base font-bold">
        {type === 'client' ? 'Khách hàng' : 'Trưởng nhóm công việc'}
      </Text>
      <TouchableWithoutFeedback onPress={onPress}>
        <View tw="elevation overflow-hidden h-12 rounded-2xl flex-row items-center">
          <View tw="ml-4 h-12 justify-center items-center">
            <Image
              tw="w-6 h-6 rounded-full"
              source={source ? source : require('../../assets/images/AddAvatar.jpeg')}
            />
          </View>

          <RNPaperTextInPut
            style={styles.textInputStyle}
            contentStyle={styles.contentStyle}
            underlineStyle={styles.underlineStyle}
            placeholderTextColor={Color.neutral2}
            editable={!notEditable}
            placeholder="Không có"
            autoCapitalize="none"
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
          />

          <View tw="mr-4 h-12 justify-center items-center">
            <Icon source={require('../../assets/icons/KeyboardArrowRight.png')} />
          </View>

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
      </TouchableWithoutFeedback>
    </View>
  );
};

export const SingleProfileTextInput = styled(CustomTextInput, 'px-5');

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
