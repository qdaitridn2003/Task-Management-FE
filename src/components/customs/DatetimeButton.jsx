import React, { useState } from 'react';
import { styled } from 'nativewind';
import { StyleSheet } from 'react-native';
import { Color } from '../../common';
import { Icon } from './CustomIcon';
import { View, Text, TextInput } from './TailwindComponent';
import { TextInput as RNPaperTextInPut } from 'react-native-paper';

const CustomDateTimeButton = ({ type, value, onChangeText, error, notEditable, style }) => {
  const typeDataMap = {
    eventStart: {
      iconSource: require('../../assets/icons/EventStart.png'),
      text: 'Bắt đầu',
      color: Color.semanticGreen,
      editable: false,
    },
    eventEnd: {
      iconSource: require('../../assets/icons/Event.png'),
      text: 'Kết thúc',
      color: Color.primary,
      editable: false,
    },
    event: {
      iconSource: require('../../assets/icons/Event.png'),
      text: 'Thời gian diễn ra',
      color: Color.primary,
      editable: false,
    },
    alarm: {
      iconSource: require('../../assets/icons/Alarm.png'),
      text: 'Thời gian nhắc nhở',
      color: Color.secondary,
      editable: false,
    },
    location: {
      iconSource: require('../../assets/icons/Location.png'),
      text: 'Nhập địa điểm',
      color: Color.primary,
      editable: true,
    },

    default: {
      iconSource: require('../../assets/icons/QuestionMark.png'),
      text: '',
      color: Color.primary,
      editable: false,
    },
  };

  const { iconSource, text, color, editable } = typeDataMap[type] || typeDataMap.default;

  return (
    <View tw="mb-4" style={style}>
      <View tw="elevation overflow-hidden h-12 rounded-2xl flex-row items-center">
        <View
          style={
            notEditable
              ? { marginLeft: 16, height: 48, justifyContent: 'center', alignItems: 'center' }
              : {
                  height: 48,
                  width: 48,
                  backgroundColor: color,
                  justifyContent: 'center',
                  alignItems: 'center',
                }
          }>
          <Icon source={iconSource} color={notEditable ? color : Color.neutral4} />
        </View>

        <RNPaperTextInPut
          style={styles.textInputStyle}
          contentStyle={styles.contentStyle}
          underlineStyle={styles.underlineStyle}
          placeholderTextColor={Color.neutral2}
          editable={editable}
          placeholder={text}
          autoCapitalize="none"
          value={value ? value : ''}
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

export const DateTimeButton = styled(CustomDateTimeButton);

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
