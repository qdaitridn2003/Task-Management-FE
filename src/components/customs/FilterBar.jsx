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
            tw="mx-1.5 my-2"
            size="small"
            key={index}
            onPress={() => setStatusFilter(tab.status)}
            type={status === tab.status ? 'primary' : 'secondary'}>
            {tab.status}
          </Button>
          // <IconTextButton
          //   isSmall
          //   showShadow
          //   key={index}
          //   onPress={() => setStatusFilter(tab.status)}
          //   label={tab.status}
          //   textColor={status === tab.status ? Color.neutral4 : Color.neutral1}
          //   buttonColor={status === tab.status ? Color.primary : Color.neutral4}
          //   style={styles.button}
          // />
        ))}
      </ScrollView>
    </View>
  );
};

export const FilterBar = styled(CustomFilterBar, 'px-5 py-2');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  filterBar: {
    flexDirection: 'row',
  },
  button: {
    margin: 4,
  },
});

export default FilterBar;
