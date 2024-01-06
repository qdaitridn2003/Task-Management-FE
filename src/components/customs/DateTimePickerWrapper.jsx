import React, { useState } from 'react';
import { TouchableHighlight, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Pressable, View } from './TailwindComponent';
import { Color } from '../../common';

const DateTimePickerWrapper = ({ onChange, children, mode = 'datetime' }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

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
    <View style={{ flex: 1 }}>
      <Pressable
        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', borderless: false }}
        underlayColor={Color.primary}
        style={{ zIndex: 10 }}
        onPress={showDateTimePicker}>
        {children}
      </Pressable>

      <DateTimePickerModal
        isVisible={showPicker}
        mode={mode}
        onConfirm={handleDateChange}
        onCancel={hideDateTimePicker}
      />
    </View>
  );
};

export default DateTimePickerWrapper;
