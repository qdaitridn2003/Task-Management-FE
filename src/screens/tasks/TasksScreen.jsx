import React from 'react';
import {
  ContainerView,
  FilterBar,
  IconButton,
  MainHeaderBar,
  ScrollView,
  Searchbar,
  View,
} from '../../components';
import { Color } from '../../common';

const listFilter = [
  { status: 'Tất cả' },
  { status: 'Sắp tới' },
  { status: 'Đang tiến hành' },
  { status: 'Hoàn thành' },
  { status: 'Đã hủy' },
];

const TasksScreen = () => {
  return (
    <ContainerView tw="px-0">
      <MainHeaderBar type="tasks" />

      {/* Search bar */}
      <View tw="flex-row px-5">
        <Searchbar tw="flex-1 mr-2.5 mb-2" />
        <IconButton
          type="secondary"
          iconColor={Color.neutral2}
          iconSource={require('../../assets/icons/Tune.png')}
        />
      </View>

      <FilterBar listTab={listFilter} />

      <ScrollView></ScrollView>
    </ContainerView>
  );
};

export default TasksScreen;
