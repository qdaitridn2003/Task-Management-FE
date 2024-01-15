import React, { useState, useEffect } from 'react';
import { styled } from 'nativewind';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from './CustomButton';

const CustomFilterBar = ({ options, selectedStatus, onSelect, style }) => {
  const [selectedValue, setSelectedValue] = useState(selectedStatus);

  useEffect(() => {
    setSelectedValue(selectedStatus || options[0].value);
  }, [selectedStatus]);

  const handleSelect = (value) => {
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
        {options.map((option, index) => (
          <Button
            key={index}
            tw="mx-1 my-2 px-0"
            size="small"
            onPress={() => handleSelect(option.value)}
            type={selectedValue === option.value ? 'primary' : 'secondary'}>
            {option.displayText}
          </Button>
        ))}
      </ScrollView>
    </View>
  );
};

export const FilterBar = styled(CustomFilterBar, 'px-5 pb-2 ');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  filterBar: {
    flexDirection: 'row',
  },
});

export default FilterBar;
