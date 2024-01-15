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
  const [isFetching, setIsFetching] = useState(false);
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
          setListNotification((prevList) => [...prevList, ...listNotices]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setIsFetching(false);
      }
    })();
  }, [page]);
  // console.log('List notification', listNotification);
  const onScrollEndList = () => {
    if (!isFetching) {
      setIsFetching(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <ContainerView tw="px-0">
      <MainHeaderBar type="notifications" rightButton={false} />
      {isLoading ? (
        <ActivityIndicator color={Color.primary} size={48} />
      ) : (
        <FlatList
          className="mb-2"
          data={listNotification}
          renderItem={(notification) => <NotificationCard notification={notification} />}
          keyExtractor={(notification) => notification._id}
          onEndReached={() => onScrollEndList()}
          ListFooterComponent={() =>
            isLoading ? <ActivityIndicator className="p-2" size={36} color={Color.primary} /> : null
          }
        />
      )}
    </ContainerView>
  );
};

export default NotificationsScreen;
