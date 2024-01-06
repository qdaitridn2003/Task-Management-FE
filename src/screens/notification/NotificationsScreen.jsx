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

const NotificationsScreen = () => {
  return (
    <ContainerView tw="px-0">
      <MainHeaderBar type="notifications" rightButton={false} />
    </ContainerView>
  );
};

export default NotificationsScreen;
