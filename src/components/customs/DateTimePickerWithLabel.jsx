import React, { useEffect, useState } from 'react';
import { styled } from 'nativewind';

import { TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Pressable, Text, View } from './TailwindComponent';
import { Color } from '../../common';
import { DateTimeButton } from './DateTimeButton';

const CustomDateTimePickerWithLabel = ({
  label,
  onChange,
  style,
  mode = 'datetime',
  type,
  value,
  onChangeText,
  error,
  notEditable,
  buttonStyle,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [processedDate, setProcessedDate] = useState(value);
  const [displayDate, setDisplayDate] = useState('');

  const handleDateChange = (selected) => {
    setShowPicker(false);

    if (selected) {
      let processedDate;
      let displayDate;

      switch (mode) {
        case 'date':
          processedDate = selected.toISOString().split('T')[0];
          displayDate = formatDate(processedDate);
          break;
        case 'time':
          processedDate = selected.toTimeString().split(' ')[0];
          displayDate = formatTime(processedDate);
          break;
        default:
          processedDate = selected.toISOString();
          displayDate = formatDefault(processedDate);
          break;
      }

      setSelectedDate(selected);
      setProcessedDate(processedDate);
      console.log('processedDate: ', processedDate);
      setDisplayDate(displayDate);
      console.log('displayDate: ', displayDate);
      onChange(processedDate);
    }
  };

  const formatDefault = (dateString) => {
    const hours = new Date(dateString).getHours();
    const ampm = hours >= 12 ? 'CH' : 'SA';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const minutes = new Date(dateString).getMinutes();
    return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm} - ${formatDate(
      dateString,
    )}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().substr(-2);
    return `${day}/${month < 10 ? '0' : ''}${month}/${year}`;
  };

  const formatTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':');
    const parsedHours = parseInt(hours, 10);
    const ampm = parsedHours >= 12 ? 'CH' : 'SA';
    const formattedHours = parsedHours % 12 === 0 ? 12 : parsedHours % 12;
    const formattedMinutes = parseInt(minutes, 10);
    return `${formattedHours}:${formattedMinutes < 10 ? '0' : ''}${formattedMinutes} ${ampm}`;
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  const hideDateTimePicker = () => {
    setShowPicker(false);
  };

  useEffect(() => {
    if (value) {
      let displayDate;

      switch (mode) {
        case 'date':
          displayDate = formatDate(value);
          break;
        case 'time':
          displayDate = formatTime(value);
          break;
        default:
          displayDate = formatDefault(value);
          break;
      }

      setDisplayDate(displayDate);
      console.log('displayDate: ', displayDate);
    }
  }, [value]);

  return (
    <View tw="flex" style={style}>
      {label && <Text tw="text-base font-bold mb-2 px-4">{label}</Text>}
      <Pressable onPress={showDateTimePicker}>
        <DateTimeButton
          tw="px-5"
          type={type}
          value={displayDate}
          onChangeText={onChangeText}
          error={error}
          notEditable={notEditable}
          style={buttonStyle}
        />
      </Pressable>

      <DateTimePickerModal
        isVisible={showPicker}
        mode={mode}
        onConfirm={handleDateChange}
        onCancel={hideDateTimePicker}
        onChange={handleDateChange}
      />
    </View>
  );
};

export const DateTimePickerWithLabel = styled(CustomDateTimePickerWithLabel);
