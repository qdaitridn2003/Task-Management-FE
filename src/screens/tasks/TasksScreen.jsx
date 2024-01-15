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

const TasksScreen = () => {
  return (
    <ContainerView tw="px-0">
      <MainHeaderBar type="tasks" />
      <ScrollView></ScrollView>
    </ContainerView>
  );
};

export default TasksScreen;
