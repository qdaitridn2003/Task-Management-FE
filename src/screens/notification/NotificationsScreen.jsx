import React, { useState, useEffect } from 'react';

import { Color, accessTokenKey } from '../../common';
import {
  ActivityIndicator,
  Button,
  ContainerView,
  FilterBar,
  FlatList,
  IconButton,
  MainHeaderBar,
  NotificationCard,
  ScrollView,
  Searchbar,
  View,
} from '../../components';
import { asyncStorageGetItem, axiosAuthGet } from '../../configs';

const NotificationsScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listNotification, setListNotification] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    (async () => {
      const accessToken = await asyncStorageGetItem(accessTokenKey);
      try {
        const response = await axiosAuthGet('/notification/get-list-notification', accessToken, {
          limit: 6,
          page,
        });
        const listNotices = response.listNotification;
        if (page === 1) {
          setListNotification(listNotices);
        } else {
          setListNotification([...listNotification, listNotices]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page]);

  return (
    <ContainerView tw="px-0">
      <MainHeaderBar type="notifications" rightButton={false} />
      {isLoading ? (
        <ActivityIndicator color={Color.primary} size={24} />
      ) : (
        <FlatList
          className="mb-2"
          data={listNotification}
          renderItem={(notification) => <NotificationCard notification={notification} />}
          keyExtractor={(notification) => notification._id}
        />
      )}

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
