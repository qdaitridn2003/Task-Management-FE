import React, { useState, useEffect } from 'react';
import { styled } from 'nativewind';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from './CustomButton';
import { Color } from './../../common/colors';

const CustomFilterBar = ({ listTab, style }) => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (listTab.length > 0) {
      setStatus(listTab[0].status);
    }
  }, [listTab]);

  const setStatusFilter = (selectedStatus) => {
    setStatus(selectedStatus);
    // You can perform additional actions based on the selected status here
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
        {listTab.map((tab, index) => (
          <Button
            tw="mx-1 my-2 px-0"
            size="small"
            key={index}
            onPress={() => setStatusFilter(tab.status)}
            type={status === tab.status ? 'primary' : 'secondary'}>
            {tab.status}
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
