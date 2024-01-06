import React from 'react';
import {
  Button,
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
      <ScrollView></ScrollView>

      <Button type="secondary" iconSource={require('../../assets/icons/DoneAll.png')}>
        Đánh dấu đã đọc tất cả
      </Button>

      <Button
        type="secondary"
        textColor={Color.semanticRed}
        iconSource={require('../../assets/icons/Delete.png')}>
        Xóa tất cả
      </Button>
    </ContainerView>
  );
};

export default NotificationsScreen;
