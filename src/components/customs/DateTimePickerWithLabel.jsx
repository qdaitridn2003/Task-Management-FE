import React, { useState } from 'react';
import { styled } from 'nativewind';

import { TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Pressable, Text, View } from './TailwindComponent';
import { Color } from '../../common';
import { DateTimeButton } from './DatetimeButton';

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

  const handleDateChange = (selected) => {
    setShowPicker(false);

    if (selected) {
      let processedDate;

      switch (mode) {
        case 'date':
          processedDate = selected.toISOString().split('T')[0];
          break;
        case 'time':
          processedDate = selected.toTimeString().split(' ')[0];
          break;
        default:
          processedDate = selected.toISOString();
          break;
      }

      setSelectedDate(selected);
      setProcessedDate(processedDate);
      onChange(processedDate);
    }
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  const hideDateTimePicker = () => {
    setShowPicker(false);
  };

  return (
    <View tw="mb-4 px-5" style={style}>
      {label && <Text tw="mb-2 text-base font-bold">{label}</Text>}

      <Pressable onPress={showDateTimePicker}>
        <DateTimeButton
          type={type}
          value={processedDate}
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
