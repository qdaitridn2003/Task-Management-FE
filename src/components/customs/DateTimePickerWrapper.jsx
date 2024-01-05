import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { View } from './TailwindComponent';

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
    <View>
      <TouchableOpacity onPress={showDateTimePicker}>{children}</TouchableOpacity>

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
